"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SelectQuantity({ onQuantityChange, quantity }: { onQuantityChange: (value: number) => void, quantity: number }) {


  const decreaseQuantity = () => {
    if(quantity > 2) {
      onQuantityChange(quantity - 1);
      return;
    }
    onQuantityChange(1)
  }

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1)
  }

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="w-full h-14"></div>;

  return (
    <div>
      <label className="block text-sm font-semibold text-black mb-2">Quantity</label>
      <div className="flex items-center">
        <button
          onClick={decreaseQuantity}
          className="w-10 h-10 rounded-l-lg bg-gradient-to-r from-amber-white to-amber-50 border border-amber-300 flex items-center justify-center hover:bg-amber-200 transition-colors duration-300"
        >
          <Minus className="w-4 h-4 text-amber-700" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={decreaseQuantity}
          min="1"
          className="w-16 h-10 border-t border-b border-amber-300 text-center text-amber-700 focus:outline-none"
        />
        <button
          onClick={increaseQuantity}
          className="w-10 h-10 rounded-r-lg bg-gradient-to-r from-amber-white to-amber-50 border border-amber-300 flex items-center justify-center hover:bg-amber-200 transition-colors duration-300"
        >
          <Plus className="w-4 h-4 text-amber-700" />
        </button>
      </div>
    </div>
  )
}