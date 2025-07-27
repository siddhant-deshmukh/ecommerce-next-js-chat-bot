'use client'

import { del, get, post, put } from "@/lib/apiCallClient";
import { CartProductSubDocument, CartType, ICart, IProduct, ProductType, UserType } from "@/models";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext<{
  user: UserType | null,
  cart: ICart | null,
  setUser: Dispatch<SetStateAction<UserType | null>>,
  authLoading: boolean,

  showAuth: boolean,
  showCart: boolean,
  showConfirmation: boolean,
  setShowAuth: Dispatch<SetStateAction<boolean>>,
  setShowCart: Dispatch<SetStateAction<boolean>>,
  setShowConfirmation: Dispatch<SetStateAction<boolean>>,
  logout: () => void,
  setCart: Dispatch<SetStateAction<ICart | null>>,
  addToCart: (quantity: number, selectedSize: number | null, product: IProduct) => Promise<any>,
  updateCart: (quantity: number | null, selectedSize: number | null, product_id: string) => Promise<any>,
  deleteCart: (product_id: string) => Promise<any>,
  addWishlist: (product_id: string, remove?: boolean) => Promise<void | boolean>
}>({
  user: null,
  cart: null,
  authLoading: false,

  showAuth: false,
  showCart: false,
  showConfirmation: false,
  setUser: () => { },
  setShowAuth: () => { },
  setShowCart: () => { },
  setShowConfirmation: () => { },
  logout: () => { },
  setCart: () => { },
  addToCart: async () => { },
  updateCart: async () => { },
  deleteCart: async () => { },
  addWishlist: async () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<UserType | null>(null);
  const [cart, setCart] = useState<ICart | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [showAuth, setShowAuth] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    setAuthLoading(true);
    get('/api')
      .then(res => {
        if (res?.user) setUser(res.user);
        if (res?.cart) setCart(res.cart);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [setAuthLoading]);

  const addToCart = useCallback(async (quantity: number, selectedSize: number | null, product: IProduct) => {
    if(!user) {
      setShowAuth(true);
      return;
    }
    if (!selectedSize) {
      toast.warning('Select a Size');
      return;
    }
    let newCart: any = { products: [] };
    if (cart?.products && Array.isArray(cart.products)) newCart.products = cart.products;

    newCart.products.push({
      discount: product.discount_percentage,
      final_amount: product.current_price,
      original_amt: product.price,
      product_id: product._id,
      quantity: quantity,
      size: selectedSize || null,
      discount_id: product.active_discount?._id,
      created_at: new Date(),
    })

    const res = await put('/api', newCart);
    if (res && res.cart)
      setCart(res.cart);
    return res.cart;
  }, [user, cart, setCart]);

  const updateCart = useCallback(async (quantity: number | null, selectedSize: number | null, product_id: string) => {
    if(!user) {
      setShowAuth(true);
      return;
    }
    let newCart: any = { products: [] };
    if (cart?.products && Array.isArray(cart.products)) newCart.products = cart.products.map((ele)=> {
      if(ele.product_id.toString() == product_id) {
        return {
          ...ele,
          quantity: quantity ? quantity : ele.quantity,
          size: selectedSize ? selectedSize : ele.size,
        }
      }
      return ele;
    });
     setCart(newCart);
    const res = await put('/api', newCart);
    if (res && res.cart)
      setCart(res.cart);
    return res.cart;
  }, [user, cart, setCart]);

  const deleteCart = useCallback(async (product_id: string) => {
    if(!user) {
      setShowAuth(true);
      return;
    }
    let newCart: any = { products: [] };
    if (cart?.products && Array.isArray(cart.products)) newCart.products = cart.products.filter((ele)=> {
      if(ele.product_id.toString() == product_id) {
        return false
      }
      return true;
    });

    const res = await put('/api', newCart);
    if (res && res.cart)
      setCart(res.cart);
    return res.cart;
  }, [user, cart, setCart]);

  const addWishlist = useCallback(async (product_id: string, remove: boolean = false) => {
    if(!user) {
      setShowAuth(true);
      return false;
    }
    if(remove) {
      const res = await del(`/api/wishlist?product_id=${product_id}`, { });
    } else {
      const res = await post(`/api/wishlist?product_id=${product_id}`, {  });
    }
  }, [user, cart, setCart]);


  const logout = () => {
    post('/api/auth/logout')
      .then(res => {
        setUser(null);
      })
  }

  return <AuthContext.Provider value={{
    authLoading,
    user,
    cart,
    showAuth,
    showCart,
    showConfirmation,
    setUser,
    setShowAuth,
    setCart,
    setShowCart,
    setShowConfirmation,
    logout,
    addToCart,
    updateCart,
    deleteCart,
    addWishlist,
  }}>{children}</AuthContext.Provider>;
};

export const useApp = () => useContext(AuthContext);