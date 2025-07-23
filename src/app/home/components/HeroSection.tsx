import { Button } from "@/components/ui/button"
import { Sparkles, Star, Diamond, Heart, Crown } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative flex min-h-[100vh] bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-orange-50/20"></div>
      {/*
      <div className="absolute bottom-10 right-20 w-48 h-48 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl"></div> 
      */}

      {/* Floating decorative icons */}
      <div className="absolute top-20 right-1/4 animate-bounce">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-full shadow-lg">
          <Diamond className="w-6 h-6 text-amber-600" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[8%] lg:left-1/4 animate-pulse">
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-3 rounded-full shadow-lg">
          <Crown className="w-6 h-6 text-orange-600" />
        </div>
      </div>
      <div className="absolute top-1/2 right-10 animate-bounce delay-300">
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-2 rounded-full shadow-lg">
          <Heart className="w-5 h-5 text-yellow-600" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="flex flex-col mr-2 sm:mr-0 justify-center space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full text-sm font-medium w-fit mx-auto lg:mx-0 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Luxury Collection 2024
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-800 via-black to-gray-900 bg-clip-text text-transparent">
                  Exquisite
                </span>
                <br className="hidden lg:block" />
                <span className="pl-3 lg:pl-0 text-black">Jewelry</span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover our handcrafted jewelry pieces that blend timeless elegance with contemporary design. Each
                piece tells a unique story of luxury and sophistication.
              </p>
            </div>

            {/* Stats with gradient backgrounds */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-center">
              <div className="bg-gradient-to-br from-white to-amber-50 p-2.5 sm:p-4 rounded-xl shadow-lg border border-amber-100">
                <div className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-gray-600">Unique Designs</div>
              </div>
              <div className="bg-gradient-to-br from-white to-orange-50 p-2.5 sm:p-4 rounded-xl shadow-lg border border-orange-100">
                <div className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-gradient-to-br from-white to-yellow-50 p-2.5 sm:p-4 rounded-xl shadow-lg border border-yellow-100">
                <div className="flex items-center gap-1 justify-center">
                  <div className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                    4.9
                  </div>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white px-4 py-3 text-base sm:px-8 sm:py-6 sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gradient-to-r from-amber-400 to-orange-400 text-black hover:text-gray-900 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:border-amber-500 px-4 py-3 text-base sm:px-8 sm:py-6 sm:text-lg font-semibold transition-all duration-300 bg-white shadow-lg"
              >
                View Catalog
              </Button>
            </div>
          </div>

          {/* Enhanced Image Content */}
          <div className="relative justify-center lg:justify-end hidden lg:block">
            <div className="relative w-[375px] h-[600px] sm:w-[450px] sm:h-[650px] lg:w-[500px] xl:w-[700px] lg:h-[700px] xl:h-[750px]">
              {/* Background gradient circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/50 to-yellow-100/50 rounded-full blur-3xl"></div>

              {/* Image 1 - Top left */}
              <div className="absolute top-0 left-0 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 z-40">
                <div className="relative w-full h-full bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-2xl border-2 border-gradient-to-br from-amber-200 to-orange-200 overflow-hidden transform rotate-3 hover:rotate-6 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/hero/earing-2-SD.jpg"
                    alt="Diamond Ring"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-orange-500/10"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white p-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Image 2 - Top right */}
              <div className="absolute top-16 right-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 z-30">
                <div className="relative w-full h-full bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-2xl border-2 border-gradient-to-br from-orange-200 to-yellow-200 overflow-hidden transform -rotate-6 hover:-rotate-12 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/hero/ring-dark-bg-1-SD.jpg"
                    alt="Gold Necklace"
                    width={280}
                    height={280}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-yellow-500/10"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-1 rounded-full">
                    <Star className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Image 3 - Bottom left */}
              <div className="absolute bottom-32 left-8 w-52 h-52 sm:w-60 sm:h-60 lg:w-68 lg:h-68 xl:w-80 xl:h-80 z-20">
                <div className="relative w-full h-full bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-2xl border-2 border-gradient-to-br from-yellow-200 to-amber-200 overflow-hidden transform rotate-12 hover:rotate-18 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/hero/gem-1-SD.jpg"
                    alt="Pearl Earrings"
                    width={260}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-transparent to-amber-500/10"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-white p-1 rounded-full">
                    <Diamond className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Image 4 - Bottom right */}
              <div className="absolute bottom-0 right-12 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-72 xl:h-72 z-10">
                <div className="relative w-full h-full bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-2xl border-2 border-gradient-to-br from-orange-200 to-amber-200 overflow-hidden transform -rotate-3 hover:-rotate-9 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/hero/necklace-1-SD.jpg"
                    alt="Silver Bracelet"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-amber-500/10"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white p-1 rounded-full">
                    <Crown className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Enhanced floating accent elements */}
              <div className="absolute top-8 right-8 bg-gradient-to-r from-white to-amber-50 rounded-full p-4 shadow-xl border-2 border-amber-200 z-50 animate-pulse">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>

              <div className="absolute bottom-8 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white rounded-full p-4 shadow-xl z-50 animate-bounce">
                <Star className="w-6 h-6" />
              </div>

              {/* Additional decorative elements */}
              <div className="absolute top-1/2 left-0 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full p-3 shadow-lg border border-yellow-200 z-50">
                <Heart className="w-4 h-4 text-yellow-600" />
              </div>

              <div className="absolute bottom-1/4 right-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full p-3 shadow-lg border border-orange-200 z-50">
                <Diamond className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute hidden lg:block bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-20">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
    </div>
  )
}