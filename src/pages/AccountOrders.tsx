import { Link, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, Package, ExternalLink } from 'lucide-react';

interface OrderLine {
  title: string;
  quantity: number;
  price: string;
}
interface Order {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  currency: string;
  order_status_url: string;
  line_items: OrderLine[];
}

const AccountOrders = () => {
  const customerEmail = useWishlistStore(s => s.customerEmail);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customer-orders', customerEmail],
    enabled: !!customerEmail,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('customer-orders', {
        body: { email: customerEmail },
      });
      if (error) throw error;
      return data as { customer: { first_name: string } | null; orders: Order[] };
    },
  });

  if (!customerEmail) return <Navigate to="/account" replace />;

  return (
    <PageLayout>
      <section className="aurea-section max-w-4xl mx-auto">
        <Link to="/account" className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-dark-green inline-flex items-center gap-2 no-underline mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to account
        </Link>
        <div className="aurea-section-label">Order History</div>
        <h1 className="aurea-section-title">My <em>Orders</em></h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-warm-gray">Couldn't load your orders. Please try again later.</div>
        ) : !data?.orders || data.orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-gold/40 mx-auto mb-4" />
            <p className="text-warm-gray text-lg font-light mb-2">No orders yet</p>
            <p className="text-warm-gray/60 text-sm mb-6">Once you place an order with this email, it'll show up here.</p>
            <Link to="/collections/all" className="btn-aurea-dark inline-block">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            {data.orders.map(order => (
              <div key={order.id} className="border border-gold/25 bg-cream-light p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="font-serif text-lg text-dark-green">{order.name}</div>
                    <div className="text-xs text-warm-gray">
                      {new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base text-warm-black font-medium">{order.currency} {parseFloat(order.total_price).toFixed(2)}</div>
                    <div className="flex gap-2 mt-1 justify-end">
                      <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold-pale text-dark-green border border-gold/30">
                        {order.financial_status}
                      </span>
                      {order.fulfillment_status && (
                        <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-cream text-warm-black border border-gold/30">
                          {order.fulfillment_status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gold/15 pt-3 space-y-1">
                  {order.line_items.map((li, i) => (
                    <div key={i} className="text-sm text-warm-gray flex justify-between">
                      <span>{li.title} × {li.quantity}</span>
                      <span>${parseFloat(li.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                {order.order_status_url && (
                  <a
                    href={order.order_status_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-[0.15em] uppercase text-gold hover:text-dark-green inline-flex items-center gap-1.5 mt-3 no-underline"
                  >
                    Track order <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default AccountOrders;
