import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { SALE } from '@/lib/promo';
import { useT } from '@/i18n';

const STORAGE_KEY = 'aurea-sale-modal-seen';

// Elegant sitewide-sale announcement. Shows once per browser session,
// shortly after the first page settles; never blocks repeat navigation.
const SaleAnnouncementModal = () => {
  const [open, setOpen] = useState(false);
  const t = useT();

  useEffect(() => {
    if (!SALE.active) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode — just close */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${SALE.pct}% off sitewide`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-warm-black/60 backdrop-blur-[2px]" onClick={close} />

      {/* Card */}
      <div
        className="relative w-full max-w-[420px] bg-cream-light border border-gold/40 shadow-2xl overflow-hidden"
        style={{ animation: 'heroFadeIn 0.5s ease-out both' }}
      >
        {/* Gold hairline frame */}
        <div className="absolute inset-2 border border-gold/25 pointer-events-none" />

        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 bg-transparent border-none cursor-pointer p-1.5 text-warm-gray hover:text-warm-black transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="relative px-10 pt-12 pb-10 text-center">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-10 h-px bg-gold/50" />
            <Sparkles className="w-4 h-4 text-gold" strokeWidth={1.5} />
            <span className="block w-10 h-px bg-gold/50" />
          </div>

          <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
            {t.saleModal.label}
          </div>

          <div className="font-serif font-light text-warm-black leading-none text-[72px] max-sm:text-[60px]">
            {SALE.pct}
            <span className="text-[40px] max-sm:text-[34px] align-top">%</span>
            <em className="italic text-gold text-[44px] max-sm:text-[36px] ml-2">OFF</em>
          </div>

          <div className="font-serif text-[20px] font-light text-dark-green mt-3">
            {t.saleModal.headline}
          </div>

          <p className="font-sans text-[13px] text-warm-gray leading-relaxed mt-4 max-w-[300px] mx-auto">
            {t.saleModal.body}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link to="/collections/all" onClick={close} className="btn-aurea-primary block text-center no-underline">
              {t.saleModal.cta}
            </Link>
            <button
              onClick={close}
              className="bg-transparent border-none cursor-pointer font-sans text-[11px] tracking-[0.15em] uppercase text-warm-gray hover:text-warm-black transition-colors py-1"
            >
              {t.saleModal.dismiss}
            </button>
          </div>
        </div>

        {/* Bottom band */}
        <div className="bg-dark-green py-2.5 text-center">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-light">
            Aurea Jewels · 18K Gold Plated
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleAnnouncementModal;
