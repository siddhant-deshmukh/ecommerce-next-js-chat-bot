'use client'

import { toast } from "sonner";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

import { ICart, ICreateOrderProdcut, IProduct, UserType } from "@/models";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "./AuthContext";
import { ICreateOrderProdcutSchema } from "@/models/OrderProduct";

export const AuthContext = createContext<{
  showConfirmation: boolean,
  setShowConfirmation: Dispatch<SetStateAction<boolean>>,
  addToCart: (quantity: number, selectedSize: number | null, product: IProduct) => Promise<any>,
  updateCart: (quantity: number | null, selectedSize: number | null, product_id: string) => Promise<any>,
  deleteCart: (product_id: string) => Promise<any>,
  addWishlist: (product_id: string, remove?: boolean) => Promise<void | boolean>,
  placeOrder: (product?: ICreateOrderProdcut) => Promise<false | undefined | void>,
}>({
  showConfirmation: false,
  setShowConfirmation: () => { },
  addToCart: async () => { },
  updateCart: async () => { },
  deleteCart: async () => { },
  addWishlist: async () => { },
  placeOrder: async () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState(false)

  const {del, get, post, put } = useApi();

  const { user, cart, setCart, setShowAuth } = useAuth()

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

  const placeOrder = useCallback(async (product?: ICreateOrderProdcut) => {
    if(!user) {
      setShowAuth(true);
      return false;
    }
    if(product) {
      await post('/api/order/', {
        action: 'buy_single_product',
        productDetails: product
      }).then(()=> {
        if(cart)
          setCart({ ...cart, products: cart.products.filter(ele=> !(ele.product_id.toString() == product.product_id && ele.size == product.size)) });
      })
    } else {
      console.log(cart?.products, cart?.products.length);
      if(!cart || cart.products.length == 0) {
        toast.warning('Empty Cart. Add Some items');
        return false;
      }
       await post('/api/order/', {
        action: 'checkout_cart',
      }).then(()=> {
        setCart({ ...cart, products: []});
      })
    }
  }, [user, cart, setCart]);


  return <AuthContext.Provider value={{
    showConfirmation,
    setShowConfirmation,
    addToCart,
    updateCart,
    deleteCart,
    addWishlist,
    placeOrder,
  }}>{children}</AuthContext.Provider>;
};

export const useApp = () => useContext(AuthContext);