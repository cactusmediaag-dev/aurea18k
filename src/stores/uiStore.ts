import { create } from 'zustand';

interface UIStore {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  openCart: () => set({ cartOpen: true }),
}));
