"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ProductImgGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(0)

  const nextImage = () => {
    setMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
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

        <div className="absolute top-4 left-4 badge-gradient px-3 py-1 rounded-full text-xs font-semibold">
          Bestseller
        </div>
      </div>

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
  )
}