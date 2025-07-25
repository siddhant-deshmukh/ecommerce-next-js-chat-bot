"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, ShoppingBag, Clock, Loader2 } from "lucide-react"
import Image from "next/image"
import { useApp } from "@/context/AppContext"
import { formatRelativeTime } from "@/lib/utils"
import { useEffect, useState } from "react"
import Link from "next/link"

interface CartItem {
  id: number
  image: string
  title: string
  description: string
  price: number
  originalPrice: number
  quantity: number
  size: string
  addedAt: string
}

export function CartPopup() {

  const { cart, setCart, showCart: open, setShowCart: onOpenChange, deleteCart, updateCart } = useApp();

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])


  const subtotal = cart ? (cart?.products.reduce((sum, item) => sum + item.final_amount * item.quantity, 0)) : 0;
  const originalTotal = cart ? (cart?.products.reduce((sum, item) => sum + item.original_amt * item.quantity, 0)) : 0;
  const totalDiscount = cart ? (originalTotal - subtotal) : 0;
  const savings = cart ? (((totalDiscount / originalTotal) * 100).toFixed(0)) : 0;

  const changeCart = async (quantity: number | null, selectedSize: number | null, product_id: string) => {
    setLoading(true);
    await updateCart(quantity, selectedSize, product_id)
    setLoading(false);
  }
  const deleteCartItem = async (product_id: string) => {
    setLoading(true);
    await deleteCart(product_id)
    setLoading(false);
  }
  

  if (!isClient) return <div className="w-full h-14"></div>;

  if (!cart) {
    return <div></div>
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-2 border-amber-200/50 max-h-[90vh] flex flex-col" showCloseButton={false}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            Shopping Cart
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white ml-auto">
              {cart.products.length} {cart.products.length === 1 ? "item" : "items"}
            </Badge>
          </DialogTitle>
        </DialogHeader>


        {cart?.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="w-16 h-16 text-amber-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some beautiful jewelry to get started</p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex max-h-[70vh] relative flex-col">
            {
              loading && <div className="z-50 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/50">
                <Loader2 className="animate-spin text-amber-500" />
              </div>
            }
            {/* Cart Items - Scrollable */}
            <div className="flex overflow-auto chat-scroll-area">
              <div className="flex flex-col space-y-4">
                {cart?.products.map((item, index) => {
                  const createdAt = formatRelativeTime(item.created_at as Date)
                  return (
                    <div key={index} className="flex gap-4 p-4 border border-amber-200/50 rounded-lg bg-white/50">
                      <Link href={`/product/${item._id}`} className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.main_image || "/placeholder.svg"}
                          alt={item.product.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product_id}`}>
                          <h4 className="font-semibold text-gray-900 truncate">{item.product.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.product.description}</p>

                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                              {item.size}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {createdAt}
                            </div>
                          </div>
                        </Link>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-600">₹{item.final_amount.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through">₹{item.original_amt.toLocaleString()}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-amber-200 rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-amber-50"
                                onClick={() => { changeCart((item.quantity > 1) ? item.quantity - 1 : 1, null, item.product_id.toString()) }}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="px-2 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-amber-50"
                                onClick={() => { changeCart(item.quantity + 1, null, item.product_id.toString()) }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                deleteCartItem(item.product_id.toString());
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex-shrink-0 bottom-0 left-0 right-0 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Original Price</span>
                  <span className="line-through">₹{originalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600 font-medium">You Save ({savings}%)</span>
                  <span className="text-green-600 font-bold">-₹{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="border-t border-amber-200/50 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => {

                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
                  size="lg"
                >
                  Proceed to Checkout • ${subtotal.toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full border-amber-200 hover:bg-amber-50"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
