import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Loader2 } from 'lucide-react';
import { storefrontApiRequest } from '@/lib/shopify';

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

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
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
        setResults(edges.map((e: any) => ({
          id: e.node.id,
          title: e.node.title,
          handle: e.node.handle,
          price: parseFloat(e.node.priceRange.minVariantPrice.amount).toFixed(2),
          image: e.node.images.edges[0]?.node?.url || null,
        })));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[120px] max-sm:pt-20">
      <div className="absolute inset-0 bg-warm-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream-light w-full max-w-xl mx-4 shadow-2xl border border-gold/20">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/15">
          <Search className="w-4 h-4 text-warm-gray" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewelry..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-warm-black placeholder:text-warm-gray/50 font-sans"
          />
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-0">
            <X className="w-4 h-4 text-warm-gray hover:text-warm-black transition-colors" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-gold" />
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-warm-gray text-sm">No results for "{query}"</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="divide-y divide-gold/10">
              {results.map((r) => (
                <Link
                  key={r.id}
                  to={`/product/${r.handle}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3 no-underline hover:bg-cream transition-colors"
                >
                  <div className="w-12 h-12 bg-cream flex-shrink-0 overflow-hidden">
                    {r.image ? (
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border border-gold/30 rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-warm-black font-light truncate">{r.title}</div>
                    <div className="text-xs text-warm-black font-medium">${r.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="text-center py-8">
              <p className="text-warm-gray/50 text-xs tracking-[0.1em] uppercase">Type to search our collection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
