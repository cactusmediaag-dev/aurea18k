import { useState } from 'react';
import { toast } from 'sonner';

const EmailCaptureSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome to the inner circle!', { position: 'top-center' });
      setEmail('');
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
          className="flex-1 py-4 px-5 border border-gold/35 bg-white/5 text-cream-light font-sans text-[13px] outline-none font-light placeholder:text-cream-light/35 focus:border-gold"
        />
        <button type="submit" className="bg-gold border-none text-warm-black font-sans text-[11px] tracking-[0.18em] uppercase font-medium py-4 px-8 cursor-pointer hover:bg-gold-light transition-colors">
          Subscribe
        </button>
      </form>
      <p className="text-[11px] text-cream-light/35 mt-4">No spam, ever. Unsubscribe anytime.</p>
    </div>
  );
};

export default EmailCaptureSection;
