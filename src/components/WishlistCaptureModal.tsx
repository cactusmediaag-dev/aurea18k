import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useWishlistStore } from '@/stores/wishlistStore';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { trackLead, trackCompleteRegistration } from '@/lib/metaPixel';

interface WishlistCaptureModalProps {
  open: boolean;
  onClose: () => void;
}

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(60),
  lastName: z.string().trim().max(60).optional(),
  email: z.string().trim().email('Invalid email').max(255),
});

const WishlistCaptureModal = ({ open, onClose }: WishlistCaptureModalProps) => {
  const setCustomer = useWishlistStore(s => s.setCustomer);
  const markPrompted = useWishlistStore(s => s.markPrompted);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, lastName, email });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || 'Invalid input');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const { error: fnError } = await supabase.functions.invoke('wishlist-register-customer', {
        body: parsed.data,
      });
      if (fnError) throw fnError;
      setCustomer({ email: parsed.data.email, firstName: parsed.data.firstName, lastName: parsed.data.lastName });
      // Meta: Lead + CompleteRegistration
      trackLead(parsed.data.email, 'wishlist_capture');
      trackCompleteRegistration(parsed.data.email);
      toast.success('Welcome to Aurea ✨', { description: 'Your wishlist is now saved.' });
      onClose();
    } catch (err) {
      console.error('wishlist register error', err);
      setCustomer({ email: parsed.data.email, firstName: parsed.data.firstName, lastName: parsed.data.lastName });
      trackLead(parsed.data.email, 'wishlist_capture');
      toast.success('Wishlist saved');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    markPrompted();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleSkip()}>
      <DialogContent className="max-w-md bg-cream-light border-gold/30">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-gold-pale border border-gold/40 flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5 text-gold fill-gold" />
          </div>
          <DialogTitle className="font-serif text-2xl text-dark-green text-center">
            Save your wishlist
          </DialogTitle>
          <DialogDescription className="text-center text-warm-gray text-sm">
            Get back to your saved pieces anytime — and unlock 10% off your first order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              maxLength={60}
              className="border border-gold/30 bg-cream-light px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              maxLength={60}
              className="border border-gold/30 bg-cream-light px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            maxLength={255}
            className="w-full border border-gold/30 bg-cream-light px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold"
            required
          />
          {error && <p className="text-xs text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-aurea-dark w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save my wishlist'}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-xs text-warm-gray hover:text-dark-green underline bg-transparent border-none cursor-pointer py-1"
          >
            Skip for now
          </button>
          <p className="text-[10px] text-warm-gray/70 text-center leading-relaxed">
            By submitting you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistCaptureModal;
