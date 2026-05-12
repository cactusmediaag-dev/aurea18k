import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  productId: string;
  handle: string;
  title: string;
  image: string | null;
  price: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  customerEmail: string | null;
  customerFirstName: string | null;
  customerLastName: string | null;
  hasPromptedCapture: boolean;
  add: (item: Omit<WishlistItem, 'addedAt'>) => void;
  remove: (productId: string) => void;
  toggle: (item: Omit<WishlistItem, 'addedAt'>) => boolean; // returns new state (true = added)
  has: (productId: string) => boolean;
  clear: () => void;
  setCustomer: (data: { email: string; firstName?: string; lastName?: string }) => void;
  clearCustomer: () => void;
  markPrompted: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      customerEmail: null,
      customerFirstName: null,
      customerLastName: null,
      hasPromptedCapture: false,

      add: (item) => {
        if (get().items.some(i => i.productId === item.productId)) return;
        set(s => ({ items: [...s.items, { ...item, addedAt: Date.now() }] }));
      },

      remove: (productId) => {
        set(s => ({ items: s.items.filter(i => i.productId !== productId) }));
      },

      toggle: (item) => {
        const exists = get().items.some(i => i.productId === item.productId);
        if (exists) {
          get().remove(item.productId);
          return false;
        }
        get().add(item);
        return true;
      },

      has: (productId) => get().items.some(i => i.productId === productId),

      clear: () => set({ items: [] }),

      setCustomer: ({ email, firstName, lastName }) =>
        set({
          customerEmail: email,
          customerFirstName: firstName ?? null,
          customerLastName: lastName ?? null,
          hasPromptedCapture: true,
        }),

      clearCustomer: () =>
        set({
          customerEmail: null,
          customerFirstName: null,
          customerLastName: null,
          hasPromptedCapture: false,
        }),

      markPrompted: () => set({ hasPromptedCapture: true }),
    }),
    {
      name: 'aurea-wishlist',
    },
  ),
);
