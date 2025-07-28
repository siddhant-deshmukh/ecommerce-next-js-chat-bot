"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, User, Phone, Sparkles } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const { setShowAuth, setShowCart, logout, user, cart, authLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
  ]

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="w-full h-24"></div>;

  return (
    <nav className="bg-gradient-to-r from-white via-amber-50/30 to-orange-50/20 shadow-xl border-b-2 border-gradient-amber sticky top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-5">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="badge-gradient p-3 rounded-full shadow-lg">
              <Sparkles className="h-3 w-3 sm:w-6 sm:h-6" />
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
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-black hover:text-amber-600 font-medium transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 badge-gradient group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {
              user && <button
                onClick={() => { setShowCart(true) }}
                aria-label="Shopping Cart"
                className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300 group relative">
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-amber-600" />
                {
                  cart && cart.products && cart.products.length > 0 && <span className="absolute -top-1 -right-1 badge-gradient text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.products.length}
                  </span>
                }
              </button>
            }

            {
              user &&
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="User Account"
                    className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300 group">
                    <User className="w-5 h-5 text-gray-700 group-hover:text-amber-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gradient-to-br from-white to-amber-50/90 shadow-2xl" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal">{user.name} ( {user.email} )</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <a target="_blank" href="https://github.com/siddhant-deshmukh/ecommerce-next-js-chat-bot">
                    <DropdownMenuItem>
                      GitHub
                    </DropdownMenuItem>
                  </a>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout() }}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            {
              !user && !authLoading && <Button
                onClick={() => { setShowAuth(true) }}
                size="sm"
                className="px-4 py-2 text-gray-600 border bg-white hover:bg-gray-100 border-gray-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Log In
              </Button>
            }
            {
              !user && authLoading && <Button
                onClick={() => { setShowAuth(true) }}
                size="sm"
                className="h-8 w-18 text-gray-600 border bg-gray-100 animate-pulse border-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
              </Button>
            }

            <Button
              size="sm"
              aria-label="Call Us"
              className="btn-gradient px-4 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </div>

          <div className="md:hidden">
            {
              user && <button
                onClick={() => { setShowCart(true) }}
                aria-label="Shopping Cart"
                className="p-2 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-full transition-all duration-300 group relative">
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-amber-600" />
                {
                  cart && cart.products && cart.products.length > 0 && <span className="absolute -top-1 -right-1 badge-gradient text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.products.length}
                  </span>
                }
              </button>
            }
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-white to-amber-50/50 shadow-2xl border-t-2 border-amber-200/50  backdrop-blur-sm">
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
                  {/* <button
                    className="flex flex-col items-center space-y-1 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-300">
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="text-xs text-gray-600">Account</span>
                  </button> */}
                </div>

                {
                  !user && !authLoading && <Button
                    onClick={() => { setShowAuth(true) }}
                    size="lg"
                    className="w-full font-semibold text-gray-600 bg-white hover:bg-gray-100 border-gray-400  py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Log In
                  </Button>
                }
                <div className="flex gap-2 justify-content-between">
                  <Button
                    size="lg"
                    aria-label="Call Now - Mobile Action"
                    className="w-full btn-gradient py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* <ConfirmationPopup /> */}
      {/* <div className="hidden md:block badge-gradient text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          <span className="font-medium">
            ✨ Free shipping on orders over $500 | 30-day return policy | Lifetime warranty ✨
          </span>
        </div>
      </div> */}
    </nav>
  )
}
