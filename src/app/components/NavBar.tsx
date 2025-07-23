"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ShoppingBag, User, Heart, Phone, Sparkles } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
  ]

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <nav className="bg-gradient-to-r from-white via-amber-50/30 to-orange-50/20 shadow-xl border-b-2 border-gradient-to-r from-amber-200/30 to-orange-200/30 sticky top-0 left-0 right-0 z-[60] backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-5">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-full shadow-lg">
              <Sparkles className="h-3 w-3 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-base sm:text-2xl font-bold">
                <span className="text-black">Luxury</span>
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Gems
                </span>
              </div>
              <p className="text-xs text-gray-600">Fine Jewelry Collection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-black hover:text-amber-600 font-medium transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              aria-label="Shopping Cart" 
              className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300 group relative">
              <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-amber-600" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>

            <button 
              aria-label="User Account"
              className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300 group">
              <User className="w-5 h-5 text-gray-700 group-hover:text-amber-600" />
            </button>

            <Button
              size="sm"
              aria-label="Call Us"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Dropdown Menu"
              className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-white to-amber-50/50 shadow-2xl border-t-2 border-gradient-to-r from-amber-200/50 to-orange-200/50 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-black hover:text-amber-600 font-medium py-2 transition-colors duration-300 border-b border-amber-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-around">
                  <button 
                    aria-label="Search - Mobile Action"
                    className="flex flex-col items-center space-y-1 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-300">
                    <Search className="w-5 h-5 text-gray-700" />
                    <span className="text-xs text-gray-600">Search</span>
                  </button>

                  <button 
                    aria-label="Whichlist - Mobile Action"
                    className="flex flex-col items-center space-y-1 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-300 relative">
                    <Heart className="w-5 h-5 text-gray-700" />
                    <span className="text-xs text-gray-600">Wishlist</span>
                    <span className="absolute top-1 right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  <button 
                    aria-label="Cart - Mobile Action"
                    className="flex flex-col items-center space-y-1 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-300 relative">
                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                    <span className="text-xs text-gray-600">Cart</span>
                    <span className="absolute top-1 right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      2
                    </span>
                  </button>

                  <button 
                    className="flex flex-col items-center space-y-1 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-300">
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="text-xs text-gray-600">Account</span>
                  </button>
                </div>

                <Button
                  size="lg"
                  aria-label="Call Now - Mobile Action"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="hidden md:block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          <span className="font-medium">
            ✨ Free shipping on orders over $500 | 30-day return policy | Lifetime warranty ✨
          </span>
        </div>
      </div> */}
    </nav>
  )
}
