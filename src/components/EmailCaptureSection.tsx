import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { trackLead } from '@/lib/metaPixel';

const EmailCaptureSection = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.trim() },
      });

      if (error) {
        toast.error('Could not subscribe. Please try again.', { position: 'top-center' });
      } else if (data?.success) {
        trackLead(email.trim(), 'newsletter_footer');
        toast.success(
          data.alreadySubscribed
            ? "You're already on the list — check your inbox for 10% off."
            : "You're in! Check your inbox to confirm and grab 10% off.",
          { position: 'top-center' },
        );
        setEmail('');
      } else {
        toast.error('Could not subscribe. Please try again.', { position: 'top-center' });
      }
    } catch {
      toast.error('Could not subscribe. Please try again.', { position: 'top-center' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-green py-24 px-12 text-center max-sm:px-6">
      <div className="aurea-section-label">Join the Inner Circle</div>
      <h2 className="aurea-section-title" style={{ color: 'hsl(var(--cream-light))' }}>
        10% Off Your <em>First Order</em>
      </h2>
      <p className="text-cream-light/65 text-sm leading-[1.8] mt-5 mb-10 mx-auto max-w-[440px]">
        Subscribe for early access to new drops, exclusive bundles, and styling tips delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-0 max-w-[460px] mx-auto max-sm:flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={submitting}
          className="flex-1 py-4 px-5 border border-gold/35 bg-white/5 text-cream-light font-sans text-[13px] outline-none font-light placeholder:text-cream-light/35 focus:border-gold disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || !email}
          className="bg-gold border-none text-warm-black font-sans text-[11px] tracking-[0.18em] uppercase font-medium py-4 px-8 cursor-pointer hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
        </button>
      </form>
      <p className="text-[11px] text-cream-light/35 mt-4">No spam, ever. Unsubscribe anytime.</p>
    </div>
  );
};

export default EmailCaptureSection;
