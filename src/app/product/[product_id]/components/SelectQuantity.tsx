"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function SelectQuantity() {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

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
          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
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