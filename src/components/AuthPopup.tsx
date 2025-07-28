"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApi } from "@/hooks/useApi"
import { useAuth } from "@/context/AuthContext"


export function AuthPopup() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);
  const { showAuth : open, setShowAuth: onOpenChange, setUser, setCart } = useAuth()
  const { post } = useApi();

  const handleSubmit = useCallback(( e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

    setIsLoading(true)
    const formData = new FormData(e.currentTarget);
    const formValues: { [key: string]: FormDataEntryValue } = {};
    for (const [name, value] of formData.entries()) {
      formValues[name] = value;
    }

    post(`/api/auth/${activeTab}`, {
      ...formValues
    }).then((res)=> {
      if(res?.user){
        setUser(res.user);
      }
      if(res?.cart) setCart(res.cart)
      onOpenChange(false);
    }).catch(()=> {
      
    }).finally(()=> {
      setIsLoading(false);
    });

  }, [activeTab])

  const [isClient, setIsClient] = useState(false)
    useEffect(() => {
      setIsClient(true)
    }, [])
    if (!isClient) return <div className="w-full h-14"></div>;
  return (
    <Dialog open={open}  onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl bg-white rounded-2xl overflow-hidden" showCloseButton={false}>
        {/* Header with gradient background */}
        <div className="px-6 pb-5 text-center text-black">
          <DialogTitle className="text-lg sm:text-2xl  font-bold mb-2 flex justify-center space-x-2">
            <span>Welcome to </span>
            <div className="font-bold">
              <span className="text-black">Luxury</span>
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Gems
              </span>
            </div>
          </DialogTitle>
          <p className="text-xs sm:text-base text-amber-600">Your premium jewelry destination</p>
        </div>

        <div className="px-1 pb-1 md:px-6 md:pb-6">
          <Tabs defaultValue="login" className="w-full" onValueChange={(value)=> { setActiveTab(value) }}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
              <TabsTrigger
                value="login"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className="pl-12 h-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      className="pl-12 pr-12 h-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-xl font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                    <Input
                      id="register-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="pl-12 h-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                    <Input
                      id="register-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="pl-12 h-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      name="password"
                      className="pl-12 pr-12 h-12 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 mt-0.5"
                    required
                  />
                  <span className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-xl font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
