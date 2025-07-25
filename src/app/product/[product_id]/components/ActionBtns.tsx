"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/models";
import { Heart, Loader2, Share2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import SelectQuantity from "./SelectQuantity";
import { useApp } from "@/context/AppContext";

export default function ActionBts({ product }: { product: IProduct }) {
  const { cart, updateCart, addToCart, deleteCart } = useApp();
  const [isClient, setIsClient] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  
  useEffect(() => {
    setIsClient(true)
  }, []);
  const adddedToCart = cart?.products.find(ele => ele.product_id.toString() == product._id);

  const [quantity, setQuantity] = useState<number>(adddedToCart?.quantity ? adddedToCart?.quantity : 1);
  const [selectedSize, setSelectedSize] = useState<number | null>(adddedToCart?.size ? adddedToCart?.size : null);


  const changeCartAction = async () => {
    setCartLoading(true);
    if (adddedToCart) {
      await deleteCart(product._id);
      setQuantity(adddedToCart.quantity);
      setSelectedSize(adddedToCart.size || null);
    } else {
      await addToCart(quantity, selectedSize, product)
    }
    setCartLoading(false);
  }


  const onQuantityChange = (value: number) => {
    if (adddedToCart) {
      updateCart(value, null, product._id)
    } else {
      setQuantity(value);
    }
  }

  const onSizeChange = (value: number) => {
    if (adddedToCart) {
      updateCart(null, value, product._id)
    } else {
      setSelectedSize(value);
    }
  }

  if (!isClient) return <div className="w-full h-14"></div>;

  return (
    <>
      <div>
        <label className="block text-sm font-semibold text-black mb-2">Ring Size</label>
        {
          !adddedToCart?.size && <div className="flex flex-wrap gap-2">
            {product.available_size.map((size) => (
              <button
                key={size}
                onClick={() => { onSizeChange(size) }}
                className={`w-10 h-10 ${size == selectedSize ? 'bg-amber-50 border-amber-500' : ''} rounded-full border-2 border-amber-200 hover:border-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-300 flex items-center justify-center text-sm font-medium`}
              >
                {size}
              </button>
            ))}
          </div>
        }
        {
          adddedToCart?.size && <div className="flex flex-wrap gap-2">
            {product.available_size.map((size) => (
              <button
                key={size}
                onClick={() => { onSizeChange(size) }}
                className={`w-10 h-10 ${size == adddedToCart?.size ? 'bg-amber-50 border-amber-500' : ''} rounded-full border-2 border-amber-200 hover:border-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-300 flex items-center justify-center text-sm font-medium`}
              >
                {size}
              </button>
            ))}
          </div>
        }
      </div>

      {!adddedToCart?.quantity && <SelectQuantity onQuantityChange={onQuantityChange} quantity={quantity} />}
      {adddedToCart?.quantity && <SelectQuantity onQuantityChange={onQuantityChange} quantity={adddedToCart?.quantity} />}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          size="lg"
          disabled={cartLoading}
          onClick={() => { changeCartAction() }}
          className="flex-1 btn-gradient py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          {!cartLoading && <ShoppingBag className="w-5 h-5 mr-2" />}
          {cartLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          {adddedToCart ? 'Remove from' : 'Add to'} Cart
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 border-2 border-amber-200 hover:border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300 bg-transparent"
        >
          <Heart className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 border-2 border-amber-200 hover:border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300 bg-transparent"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>
    </>
  )
}