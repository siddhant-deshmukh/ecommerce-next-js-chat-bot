"use client";

import { Button } from "@/components/ui/button";
import { IOrderProducts, IProduct } from "@/models";
import { Heart, Loader2, Share2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import SelectQuantity from "./SelectQuantity";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { formatRelativeTime } from "@/lib/utils";

export default function ActionBts({ product }: { product: IProduct }) {
  
  const { cart } = useAuth();
  const { updateCart, addToCart, deleteCart, addWishlist, placeOrder } = useApp();
  const [isClient, setIsClient] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [lastOrder, setLastOrder] = useState<IOrderProducts | null>(product.last_order ? product.last_order : null);
  const [buyProductLoading, setBuyProductLoading] = useState(false);


  useEffect(() => {
    setIsClient(true)
  }, []);
  const adddedToCart = cart?.products.find(ele => ele.product_id.toString() == product._id);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    const theProduct = cart?.products.find(ele => ele.product_id.toString() == product._id)
    if(theProduct) {
      setQuantity(theProduct?.quantity);
      setSelectedSize(theProduct.size);
    }
  }, [cart]);


  const [inWishlist, setInWishList] = useState<boolean>(product.liked);

  const toggleWishList = (remove: boolean) => {
    setInWishList(remove);
    addWishlist(product._id, !remove);
  }

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
  const onPlaceOrder = async () => {
    if(!selectedSize) {
      toast.warning('Select a Size');
      return;
    }
    setBuyProductLoading(true);
    await placeOrder({
      discount: product.active_discount.percentage,
      discount_id: product.active_discount._id,
      size: selectedSize,
      original_amt: product.price,
      final_amount: product.current_price,
      product_id: product._id,
      quantity
    });
    setLastOrder({
      discount: product.active_discount.percentage,
      discount_id: product.active_discount._id,
      size: selectedSize,
      original_amt: product.price,
      final_amount: product.current_price,
      product_id: product._id,
      quantity,
      user_id: "",
      _id: "",
      createdAt: new Date(),
    })
    setBuyProductLoading(false);
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
          <div className="flex flex-wrap gap-2">
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
      </div>
      <SelectQuantity onQuantityChange={onQuantityChange} quantity={quantity} />
      
     {
        lastOrder &&  <div className="text-black">
          Last Order of {lastOrder.quantity} pieces of <span className="text-amber-600">size {lastOrder.size}</span> was placed <span className="text-amber-600">{formatRelativeTime(lastOrder.createdAt)}</span>.
        </div>
      }

      <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4">
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
          disabled={buyProductLoading}
          onClick={()=> { onPlaceOrder() }}
          className="flex-1 bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Buy{buyProductLoading ? 'ing' : ''} Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={()=> { toggleWishList(!inWishlist) }}
          className={`w-14 h-14 border-2 border-amber-200 hover:border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300 ${inWishlist ? 'bg-amber-100' : 'bg-transparent'}`}
        >
          <Heart className={`w-6 h-6 text-amber-600 ${inWishlist ? 'fill-amber-500' : 'fill-none'}`} />
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