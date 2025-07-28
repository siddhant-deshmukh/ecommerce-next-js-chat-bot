'use client';

import { toast } from "sonner";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

import { ICart, IProduct, UserType } from "@/models";
import { useApi } from "@/hooks/useApi";
import { get, post } from "@/lib/apiCallClient";

export const AuthContext = createContext<{
  user: UserType | null,
  setUser: Dispatch<SetStateAction<UserType | null>>,
  authLoading: boolean,
  logout: () => void,
  showAuth: boolean,
  setShowAuth: Dispatch<SetStateAction<boolean>>,
  cart: ICart | null,
  setCart: Dispatch<SetStateAction<ICart | null>>,
  showCart: boolean,
  setShowCart: Dispatch<SetStateAction<boolean>>,
}>({
  user: null,
  cart: null,
  authLoading: false,
  showAuth: false,
  setUser: () => { },
  setShowAuth: () => { },
  logout: () => { },
  setCart: () => { },
  showCart: false,
  setShowCart: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState<ICart | null>(null);

  // const { get, post } = useApi();

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


  const logout = () => {
    post('/api/auth/logout')
      .then(res => {
        setUser(null);
      })
  }

  return <AuthContext.Provider value={{
    authLoading,
    user,
    showAuth,
    setUser,
    setShowAuth,
    logout,
    cart,
    setCart,
    showCart,
    setShowCart,
  }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);