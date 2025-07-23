import { Button } from "@/components/ui/button"
import { Phone, Mail, Clock, Send, MessageCircle, MapPin, Shield, Award, Headphones, Star } from "lucide-react"

export default function ContactUs() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our jewelry experts",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Sat: 9AM-7PM",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get detailed assistance via email",
      contact: "info@luxurygems.com",
      availability: "24/7 Response",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help from our team",
      contact: "Start Chat",
      availability: "Online Now",
      gradient: "from-yellow-500 to-amber-500",
    },
  ]

  const guarantees = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "SSL encrypted & secure payments",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Lifetime warranty on all pieces",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Professional jewelry consultants",
    },
    {
      icon: Star,
      title: "Satisfaction Promise",
      description: "30-day return policy",
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gradient px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">Let's Create Something</span>
            <br />
            <span className="text-gradient">
              Beautiful Together
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're looking for the perfect engagement ring, a custom design, or expert advice, our team of
            jewelry specialists is here to make your vision come to life.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient-amber p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <method.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-3">{method.description}</p>
              <p className="font-semibold text-black mb-1">{method.contact}</p>
              <p className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-medium">
                {method.availability}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient-amber px-4 sm:px-8 p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-black mb-4">Send us a Message</h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours with personalized assistance.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="select-interest" className="block text-sm font-semibold text-black mb-2">I'm interested in *</label>
                  <select
                    required
                    id="select-interest"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white"
                  >
                    <option value="">Select your interest</option>
                    <option value="engagement-rings">Engagement Rings</option>
                    <option value="wedding-bands">Wedding Bands</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="custom-design">Custom Design</option>
                    <option value="repair-service">Repair Service</option>
                    <option value="appraisal">Jewelry Appraisal</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget-range-select" className="block text-sm font-semibold text-black mb-2">Budget Range</label>
                  <select id="budget-range-select" className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white">
                    <option value="">Select budget range (optional)</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Message *</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white resize-none"
                    placeholder="Tell us about your dream piece, special occasion, or how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="mt-1 w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    I'd like to receive updates about new collections, exclusive offers, and jewelry care tips.
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-gray-800 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-8">
            {/* Store Information */}
            <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-xl border-2 border-orange-200/50 p-6">
              <h3 className="text-xl font-bold text-black mb-6 text-center">Visit Our Store</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="badge-gradient p-2 rounded-full flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Address</p>
                    <p className="text-gray-600 text-sm">
                      123 Jewelry Lane
                      <br />
                      Diamond District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-full text-white flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Store Hours</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Guarantees */}
            <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-2xl shadow-xl border-2 border-yellow-200/50 p-6">
              <h3 className="text-xl font-bold text-black mb-6 text-center">Our Promise</h3>

              <div className="space-y-4">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="badge-gradient p-2 rounded-full flex-shrink-0">
                      <guarantee.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm">{guarantee.title}</p>
                      <p className="text-gray-600 text-xs">{guarantee.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient-amber p-6">
              <h3 className="text-xl font-bold text-black mb-6 text-center">Quick Help</h3>

              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg hover:from-amber-100 hover:to-orange-100 transition-all duration-300 border border-amber-200">
                  <p className="font-semibold text-black text-sm">Ring Sizing Guide</p>
                  <p className="text-gray-600 text-xs">Find your perfect fit</p>
                </button>

                <button className="w-full text-left p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 border border-orange-200">
                  <p className="font-semibold text-black text-sm">Jewelry Care</p>
                  <p className="text-gray-600 text-xs">Keep your pieces pristine</p>
                </button>

                <button className="w-full text-left p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
                  <p className="font-semibold text-black text-sm">Custom Design Process</p>
                  <p className="text-gray-600 text-xs">Create your unique piece</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200/50">
          <h3 className="text-2xl font-bold text-black mb-4">Ready to Find Your Perfect Piece?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our jewelry experts are standing by to help you discover or create the perfect piece for any occasion. Don't
            wait - let's start your jewelry journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-gradient px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (555) 123-4567
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-amber-400 text-black hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:border-amber-500 px-8 py-3 font-semibold transition-all duration-300 bg-white shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}