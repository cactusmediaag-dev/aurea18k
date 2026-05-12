import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { useWishlistStore } from '@/stores/wishlistStore';
import { Heart, Package, LogOut, User as UserIcon, Mail } from 'lucide-react';
import { useState } from 'react';

const Account = () => {
  const customerEmail = useWishlistStore(s => s.customerEmail);
  const firstName = useWishlistStore(s => s.customerFirstName);
  const setCustomer = useWishlistStore(s => s.setCustomer);
  const clearCustomer = useWishlistStore(s => s.clearCustomer);
  const wishlistCount = useWishlistStore(s => s.items.length);
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [firstInput, setFirstInput] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setCustomer({ email: emailInput.trim(), firstName: firstInput.trim() || undefined });
  };

  if (!customerEmail) {
    return (
      <PageLayout>
        <section className="aurea-section max-w-md mx-auto text-center">
          <div className="aurea-section-label">My Account</div>
          <h1 className="aurea-section-title">Welcome to <em>Aurea</em></h1>
          <p className="text-warm-gray text-sm mt-3 font-light">
            Enter your email to access your wishlist and orders.
          </p>

          <form onSubmit={handleSignIn} className="mt-8 space-y-3 text-left">
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstInput}
              onChange={e => setFirstInput(e.target.value)}
              maxLength={60}
              className="w-full border border-gold/30 bg-cream-light px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold"
            />
            <input
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              maxLength={255}
              required
              className="w-full border border-gold/30 bg-cream-light px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-aurea-dark w-full">Continue</button>
          </form>
          <p className="text-[11px] text-warm-gray mt-4 leading-relaxed">
            No password needed. Your wishlist is saved on this device, and your orders are looked up by email.
          </p>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="aurea-section max-w-3xl mx-auto">
        <div className="aurea-section-label">My Account</div>
        <h1 className="aurea-section-title">
          Hello{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="text-warm-gray text-sm mt-2 flex items-center gap-2 justify-center">
          <Mail className="w-3.5 h-3.5" /> {customerEmail}
        </p>

        <div className="grid grid-cols-2 gap-5 mt-10 max-sm:grid-cols-1">
          <Link
            to="/account/wishlist"
            className="border border-gold/25 bg-cream-light p-6 hover:border-gold transition-colors no-underline group"
          >
            <Heart className="w-6 h-6 text-gold mb-3 group-hover:fill-gold transition-all" />
            <div className="font-serif text-xl text-dark-green mb-1">My Wishlist</div>
            <div className="text-sm text-warm-gray">{wishlistCount} {wishlistCount === 1 ? 'piece' : 'pieces'} saved</div>
          </Link>

          <Link
            to="/account/orders"
            className="border border-gold/25 bg-cream-light p-6 hover:border-gold transition-colors no-underline group"
          >
            <Package className="w-6 h-6 text-gold mb-3" />
            <div className="font-serif text-xl text-dark-green mb-1">My Orders</div>
            <div className="text-sm text-warm-gray">View order history & status</div>
          </Link>
        </div>

        <div className="mt-10 border-t border-gold/20 pt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => { clearCustomer(); navigate('/'); }}
            className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-dark-green flex items-center gap-2 bg-transparent border-none cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Account;
