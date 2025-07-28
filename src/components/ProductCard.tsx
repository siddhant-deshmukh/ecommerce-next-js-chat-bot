"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

import { IProduct } from "@/models";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

function ProductCard({ product, adddedToCart }: { product: IProduct, adddedToCart: boolean }) {

  const router = useRouter();
  const { deleteCart, addWishlist } = useApp();

  const [inWishlist, setInWishList] = useState<boolean>(product.liked);

  const toggleWishList = (remove: boolean) => {
    addWishlist(product._id, !remove).then((res)=> {
      if(res == false) {

      } else {
        setInWishList(remove);
      }
    });
  }

  return (
    <div
      className={`relative bg-gradient-to-br from-white to-amber-50/50 flex flex-col rounded-2xl shadow-xl border-gradient-amber overflow-hidden transform hover:cursor-pointer transition-all duration-300 hover:shadow-2xl ${product.is_featured ? "lg:col-span-1 lg:row-span-1" : ""
        }`}
    >
      <Link href={`/product/${product._id}`} className="group">
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-4 right-4 z-20 badge-gradient px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        <div className={`relative overflow-hidden ${product.is_featured ? "h-64" : "h-64"}`}>
          <Image
            src={product.main_image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={product.is_featured ? 600 : 300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-black  transition-colors duration-300">
              {product.title}
            </h3>
            {/* <span className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                    {product.itemCount}
                  </span> */}
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
            {product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ₹{product.current_price.toLocaleString()}
            </span>
            <span className="text-base md:text-lg text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
            {
              (product.discount_percentage > 0) &&
              <span className="badge-gradient px-2 py-1 rounded text-xs lg:text-sm font-medium">
                Save {product.discount_percentage}%
              </span>
            }
          </div>
        </div>
      </Link>
      <div className="mt-auto pt-3 px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            onClick={()=> {
              if(adddedToCart) deleteCart(product._id);
              else router.push(`/product/${product._id}`);
            }}
            className="flex-1 items-center btn-gradient py-6 text-sm lg:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{adddedToCart ? 'Remove from' : 'Add to'} Cart</span>
          </Button>
          <Button
            size="lg"
            onClick={()=> {
             router.push(`/product/${product._id}`);
            }}
            className="flex-1 bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white py-6 text-sm lg:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={()=> { toggleWishList(!inWishlist) }}
            className={`aspect-square p-6 border-2  border-amber-200 hover:border-amber-500 text-amber-600 group hover:bg-amber-50 transition-all duration-300 ${inWishlist ? 'bg-amber-100' : 'bg-transparent'}`}
          >
            <Heart className={`w-6 h-6 group-hover:fill-amber-500 ${inWishlist ? 'fill-amber-500' : 'fill-none'} text-amber-500`} />
          </Button>
        </div>
      </div>
      {/* <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-6 w-[50px] right-6 aspect-square py-6 border-2 border-amber-200 hover:border-amber-500 text-amber-600 group hover:bg-amber-50 transition-all duration-300 bg-transparent"
                >
                  <Heart className="w-6 h-6 group-hover:fill-amber-500 text-amber-500" />
                </Button> */}
    </div>
  )
}

export default React.memo(ProductCard);