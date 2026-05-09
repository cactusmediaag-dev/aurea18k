import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Loader2, TrendingUp } from 'lucide-react';
import { storefrontApiRequest } from '@/lib/shopify';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string | null;
}

const SEARCH_QUERY = `
  query SearchProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title handle
          priceRange { minVariantPrice { amount } }
          images(first: 1) { edges { node { url } } }
        }
      }
    }
  }
`;

const BESTSELLERS_QUERY = `
  query BestSellers($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id title handle
          priceRange { minVariantPrice { amount } }
          images(first: 1) { edges { node { url } } }
        }
      }
    }
  }
`;

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [bestsellers, setBestsellers] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Load bestsellers on first open
  useEffect(() => {
    if (open && bestsellers.length === 0) {
      storefrontApiRequest(BESTSELLERS_QUERY, { first: 6 })
        .then((data) => {
          const edges = data?.data?.products?.edges || [];
          setBestsellers(
            edges.map((e: any) => ({
              id: e.node.id,
              title: e.node.title,
              handle: e.node.handle,
              price: parseFloat(e.node.priceRange.minVariantPrice.amount).toFixed(2),
              image: e.node.images.edges[0]?.node?.url || null,
            }))
          );
        })
        .catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await storefrontApiRequest(SEARCH_QUERY, { first: 8, query: `title:*${query}*` });
        const edges = data?.data?.products?.edges || [];
        setResults(
          edges.map((e: any) => ({
            id: e.node.id,
            title: e.node.title,
            handle: e.node.handle,
            price: parseFloat(e.node.priceRange.minVariantPrice.amount).toFixed(2),
            image: e.node.images.edges[0]?.node?.url || null,
          }))
        );
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const displayItems = query.trim() ? results : [];
  const showBestsellers = !query.trim() && !loading && bestsellers.length > 0;

  const ProductRow = ({ item, index }: { item: SearchResult; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
    >
      <Link
        to={`/product/${item.handle}`}
        onClick={onClose}
        className="flex items-center gap-4 px-5 py-3.5 no-underline hover:bg-cream/60 transition-colors group"
      >
        <div className="w-14 h-14 bg-cream rounded-lg flex-shrink-0 overflow-hidden">
          {item.image ? (
            <img src={item.image + '?width=160'} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-7 h-7 border border-gold/30 rounded-full" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-warm-black font-light truncate group-hover:text-gold transition-colors">{item.title}</div>
          <div className="text-xs text-gold font-medium mt-0.5">${item.price}</div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-warm-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl mx-auto mt-[100px] max-sm:mt-16 max-sm:mx-3 bg-cream-light rounded-2xl shadow-2xl border border-gold/15 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4">
              <Search className="w-[18px] h-[18px] text-gold" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jewelry..."
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-warm-black placeholder:text-warm-gray/40 font-sans tracking-wide"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="bg-transparent border-none cursor-pointer p-1.5 rounded-full hover:bg-cream transition-colors"
              >
                <X className="w-4 h-4 text-warm-gray" />
              </motion.button>
            </div>

            <div className="h-px bg-gold/15" />

            {/* Content */}
            <div className="max-h-[55vh] overflow-y-auto">
              {/* Loading */}
              {loading && (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gold" />
                </div>
              )}

              {/* No results */}
              {!loading && query.trim() && displayItems.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-warm-gray text-sm">No results for "<span className="text-warm-black font-medium">{query}</span>"</p>
                  <p className="text-warm-gray/50 text-xs mt-1">Try a different search term</p>
                </div>
              )}

              {/* Search results */}
              {!loading && displayItems.length > 0 && (
                <div className="py-1">
                  {displayItems.map((item, i) => (
                    <ProductRow key={item.id} item={item} index={i} />
                  ))}
                </div>
              )}

              {/* Bestsellers recommendations */}
              {showBestsellers && (
                <div className="py-4">
                  <div className="flex items-center gap-2 px-5 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">Best Sellers</span>
                  </div>
                  {bestsellers.map((item, i) => (
                    <ProductRow key={item.id} item={item} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="h-px bg-gold/10" />
            <div className="px-5 py-3 flex items-center justify-between">
              <span className="text-[10px] text-warm-gray/40 tracking-wider uppercase">Press ESC to close</span>
              <Link
                to="/collections/all"
                onClick={onClose}
                className="text-[10px] tracking-[0.15em] uppercase text-gold font-medium no-underline hover:text-gold-dark transition-colors"
              >
                Shop All →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
