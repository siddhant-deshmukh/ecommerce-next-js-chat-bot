"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { IProduct } from "@/models";
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react";

export default function CollectionsGrid() {

  const { cart } = useAuth();
  const { get } = useApi();

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<(IProduct)[]>([]);

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
    <section id="collections" className="relative py-20 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 overflow-hidden">
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
          {!loading && products.slice(0, 9).map((product) => {
            const adddedToCart = cart?.products.find(ele => ele.product_id.toString() == product._id);

            return <ProductCard key={product._id} product={product} adddedToCart={adddedToCart ? true : false} />
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
