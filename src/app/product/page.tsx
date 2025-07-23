"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  Info,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
} from "lucide-react"
import Image from "next/image"
import CustomizationRequest from "./components/CustomizationRequest"

export default function ProductDetail() {
  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Product images
  const images = [
    "/hero/earing-1-MD.jpg",
    "/hero/gem-1-SD.jpg",
    "/hero/necklace-1-HD.jpg",
    "/hero/earing-1-MD.jpg",
    "/hero/ring-dark-bg-1-SD.jpg",
  ]

  // Product specifications
  const specifications = [
    { name: "Metal Type", value: "18K White Gold" },
    { name: "Diamond Carat", value: "1.5 ct" },
    { name: "Diamond Cut", value: "Round Brilliant" },
    { name: "Diamond Color", value: "F (Colorless)" },
    { name: "Diamond Clarity", value: "VS1 (Very Slightly Included)" },
    { name: "Ring Size", value: "Available in sizes 4-10" },
    { name: "Setting Type", value: "Prong Setting" },
    { name: "Band Width", value: "2.3mm" },
    { name: "Certificate", value: "GIA Certified" },
  ]

  // Product features
  const features = [
    "Handcrafted by master jewelers",
    "Ethically sourced diamonds",
    "Complimentary sizing and adjustments",
    "Lifetime warranty",
    "Includes luxury gift packaging",
  ]

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Handle image navigation
  const nextImage = () => {
    setMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="py-12 bg-gradient-to-br from-white via-orange-50/10 to-amber-50/20">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"></div>

      <div className="container  mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <a href="#" className="hover:text-amber-600 transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="#" className="hover:text-amber-600 transition-colors">
            Jewelry
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="#" className="hover:text-amber-600 transition-colors">
            Rings
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Radiant Solitaire Diamond Ring</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="w-full lg:w-1/2 static lg:sticky top-24 self-start">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient p-6 aspect-square">
              <Image
                src={images[mainImage] || "/placeholder.svg"}
                alt="Radiant Solitaire Diamond Ring"
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />

              {/* Image Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Featured Badge */}
              <div className="absolute top-4 left-4 badge-gradient px-3 py-1 rounded-full text-xs font-semibold">
                Bestseller
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative min-w-[80px] h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === index ? "border-amber-500 shadow-md" : "border-gray-200 hover:border-amber-300"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Radiant Solitaire Diamond Ring</h1>
              <p className="text-lg text-gray-600 mb-4">18K White Gold | 1.5 Carat Diamond</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-gray-700">4.9</span>
                <span className="text-gray-500">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  $5,999.00
                </span>
                <span className="text-lg text-gray-500 line-through">$6,499.00</span>
                <span className="badge-gradient px-2 py-1 rounded text-sm font-medium">
                  Save $500
                </span>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 leading-relaxed">
                Elevate your special moments with our exquisite Radiant Solitaire Diamond Ring. This stunning piece
                features a brilliant 1.5 carat diamond set in luxurious 18K white gold, creating a timeless symbol of
                elegance and love.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Purchase Actions */}
            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Ring Size</label>
                <div className="flex flex-wrap gap-2">
                  {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 rounded-full border-2 border-amber-200 hover:border-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-300 flex items-center justify-center text-sm font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-l-lg bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-16 h-10 border-t border-b border-gray-300 text-center text-gray-700 focus:outline-none"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-r-lg bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button
                  size="lg"
                  className="flex-1 btn-gradient py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
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
            </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                <Truck className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-black">Free Shipping</p>
                  <p className="text-xs text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                <Shield className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-semibold text-black">Secure Payment</p>
                  <p className="text-xs text-gray-600">SSL encrypted checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-100">
                <RefreshCw className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-semibold text-black">30-Day Returns</p>
                  <p className="text-xs text-gray-600">Money back guarantee</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-black mb-6">Product Specifications</h2>

              <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient p-6 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-amber-50/50 to-orange-50/50"
                            }`}
                        >
                          <td className="py-3 px-4 font-semibold text-black border-b border-amber-100">{spec.name}</td>
                          <td className="py-3 px-4 text-gray-700 border-b border-amber-100">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <CustomizationRequest />
          </div>
        </div>



        {/* Product Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Features & Benefits</h2>
            <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-xl border-2 border-orange-200/50 p-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="badge-gradient p-1 rounded-fullflex-shrink-0 ">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Care Instructions</h2>
            <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-2xl shadow-xl border-2 border-gradient-amber p-6">
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="badge-gradient p-2 rounded-full text-white flex-shrink-0">
                  <Info className="w-4 h-4" />
                </div> */}
                <p className="text-gray-700">
                  To keep your diamond ring looking its best, follow these simple care instructions:
                </p>
              </div>
              <ul className="space-y-3 text-gray-700 list-disc">
                {
                  ["Clean regularly with mild soap and warm water",
                    "Avoid contact with harsh chemicals and cleaning agents",
                    "Remove before swimming, exercising, or household chores",
                    "Store separately to prevent scratching",
                    "Have professional cleaning twice a year"].map((ele) => {
                      return <li className="flex items-center gap-4">
                        <div className="badge-gradient p-2 rounded-full flex-shrink-0">
                        </div>
                        <span>{ele}</span>
                      </li>
                    })
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "/hero/gem-1-SD.jpg",
              "/hero/necklace-1-HD.jpg",
              "/hero/earing-1-MD.jpg",
              "/hero/ring-dark-bg-1-SD.jpg",
            ].map((url, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg border border-amber-200/50 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-64">
                  <Image
                    src={url}
                    alt={`Related Ring ${index}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                    <Heart className="w-4 h-4 text-gray-700 hover:text-amber-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-black group-hover:text-amber-600 transition-colors duration-300">
                    Diamond Cluster Ring
                  </h3>
                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-black">$2,499</span>
                    <span className="text-sm text-gray-500 line-through">$2,899</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
