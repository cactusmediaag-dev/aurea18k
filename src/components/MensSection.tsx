import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { storefrontApiRequest } from '@/lib/shopify';
import { ShopifyProduct } from '@/stores/cartStore';
import ProductCard from '@/components/ProductCard';

const MENS_QUERY = `
  query MensCollection {
    collectionByHandle(handle: "mens") {
      products(first: 12) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            tags
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 5) { edges { node { url altText } } }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  availableForSale
                  selectedOptions { name value }
                }
              }
            }
            options { name values }
          }
        }
      }
    }
  }
`;

function useMensProducts() {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-mens-collection'],
    queryFn: async () => {
      const data = await storefrontApiRequest(MENS_QUERY);
      return data?.data?.collectionByHandle?.products?.edges || [];
    },
  });
}

const MensSection = () => {
  const { data, isLoading } = useMensProducts();

  const items = (data || [])
    .filter(p => p.node.variants.edges.some(v => v.node.availableForSale))
    .slice(0, 4);

  if (isLoading) {
    return (
      <section className="aurea-section bg-cream">
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="aurea-section bg-cream">
      <div className="flex justify-between items-end mb-14 gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <div className="aurea-section-label">For Him</div>
          <h2 className="aurea-section-title text-balance">The Men's <em>Edit</em></h2>
        </div>

        <Link
          to="/collections/mens"
          className="shrink-0 font-sans text-[11px] tracking-[0.18em] uppercase text-dark-green no-underline border-b border-gold pb-0.5 hover:text-gold transition-colors"
        >
          View All Men's →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(product => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MensSection;
