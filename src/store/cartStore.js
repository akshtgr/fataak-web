import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add a product to the cart
      // If it already exists, just increase the quantity
      addToCart: (product) => {
        const itemExists = get().cartItems.find(
          (item) => item.id === product.id
        );
        if (itemExists) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          }));
        }
      },

      // Remove a product from the cart
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      // Increase quantity of an item
      increaseQuantity: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      // Decrease quantity of an item
      // If quantity becomes 0, remove it from the cart
      decreaseQuantity: (productId) => {
        const item = get().cartItems.find((item) => item.id === productId);
        if (item && item.quantity > 1) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }));
        } else {
          // Remove item if quantity is 1 or less
          get().removeFromCart(productId);
        }
      },

      // Get the total number of items in the cart
      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      // Get the total price of the cart
      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.our_price * item.quantity,
          0
        );
      },

      // Clear the cart
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: 'fataak-cart-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);