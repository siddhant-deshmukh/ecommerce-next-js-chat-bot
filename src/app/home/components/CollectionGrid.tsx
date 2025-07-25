"use client";

import { Button } from "@/components/ui/button"
import { useApp } from "@/context/AppContext";
import { get } from "@/lib/apiCallClient";
import { ProductType } from "@/models";
import { ArrowRight, Heart, ShoppingBag, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CollectionsGrid() {

  const { cart } = useApp();

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<(ProductType & {
    _id: string, current_price: number, discount_percentage: number
  })[]>([]);

  useEffect(() => {
    setLoading(true)
    get('/api/product')
      .then((res) => {
        setProducts(res.products)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);


  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div></div>;


  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>

      <div className="lg:container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gradient px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Our Products
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">Explore Our</span>
            <br />
            <span className="text-gradient">
              Jewelry Products
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated products, each piece telling its own story of craftsmanship and elegance.
          </p>
        </div>

        {/* products Grid */}
        <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {!loading && products.slice(0, 9).map((product, index) => {
            const adddedToCart = cart?.products.find(ele => ele.product_id.toString() == product._id);

            return (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-white to-amber-50/50 flex flex-col rounded-2xl shadow-xl border-gradient-amber overflow-hidden transform hover:cursor-pointer transition-all duration-300 hover:shadow-2xl ${product.isFeatured ? "lg:col-span-1 lg:row-span-1" : ""
                  }`}
              >
                <Link href={`/product/${product._id}`} className="group">
                  {/* Featured Badge */}
                  {product.isFeatured && (
                    <div className="absolute top-4 right-4 z-20 badge-gradient px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Image Container */}
                  {/* [900px] */}
                  <div className={`relative overflow-hidden ${product.isFeatured ? "h-64" : "h-64"}`}>
                    <Image
                      src={product.main_image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={product.isFeatured ? 600 : 300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-black  transition-colors duration-300">
                        {product.title}
                      </h3>
                      {/* <span className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                    {product.itemCount}
                  </span> */}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
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
                  <div className="mt-auto px-6 pb-6">
                    <div className="flex items-center gap-3">
                      <Button
                        size="lg"
                        className="flex-1 items-center btn-gradient py-6 text-sm lg:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>{ adddedToCart ? 'Remove from' : 'Add to'} Cart</span>
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white py-6 text-sm lg:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square p-6 border-2 border-none transition-all duration-300 bg-transparent"
                      >
                        <div className="w-6 h-6 group-hover:fill-amber-500 text-amber-500" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-6 w-[50px] right-6 aspect-square py-6 border-2 border-amber-200 hover:border-amber-500 text-amber-600 group hover:bg-amber-50 transition-all duration-300 bg-transparent"
                >
                  <Heart className="w-6 h-6 group-hover:fill-amber-500 text-amber-500" />
                </Button>
              </div>
            )
          })}
          {
            loading && Array.from({ length: 9 }).map((_, ele) => {
              return <div key={ele + 10} className="h-[520px] w-full animate-pulse bg-gradient-to-br from-white to-amber-100 flex flex-col rounded-2xl shadow-xl border-gradient-amber overflow-hidden transform hover:cursor-pointer transition-all duration-300 hover:shadow-2xl">
                <div className="w-full h-64 animate-pulse bg-gradient-to-br from-white to-amber-100">

                </div>
              </div>
            })
          }
        </div>

        {/* View All Button */}
        <div className="text-center mt-12" >
          <Button
            size="lg"
            className="bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            View All Collections
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
