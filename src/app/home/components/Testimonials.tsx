import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bride",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "The diamond ring I purchased for my engagement was absolutely perfect. The craftsmanship is exceptional and the customer service was outstanding. I couldn't be happier with my choice!",
      product: "Diamond Engagement Ring",
    },
    {
      name: "Michael Chen",
      role: "Anniversary Gift",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      text: "I bought a beautiful gold necklace for my wife's anniversary. The quality exceeded my expectations and she absolutely loves it. Will definitely shop here again!",
      product: "Gold Anniversary Necklace",
    },
    {
      name: "Emily Rodriguez",
      role: "Jewelry Collector",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 4,
      text: "As someone who collects vintage jewelry, I'm very particular about quality. This store has the most beautiful vintage pieces I've ever seen. Truly exceptional!",
      product: "Vintage Pearl Set",
    },
    {
      name: "David Thompson",
      role: "Gift Buyer",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      text: "Purchased earrings for my daughter's graduation. The packaging was elegant and the jewelry was even more beautiful in person. Highly recommended!",
      product: "Pearl Graduation Earrings",
    },
    {
      name: "Lisa Wang",
      role: "Bridal Party",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 5,
      text: "Ordered matching bracelets for my entire bridal party. Each piece was perfectly crafted and arrived on time. The girls absolutely loved them!",
      product: "Bridal Party Bracelet Set",
    },
    {
      name: "James Wilson",
      role: "Luxury Shopper",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      rating: 4,
      text: "The luxury collection here is unmatched. I've purchased several pieces and each one has been a masterpiece. The attention to detail is remarkable.",
      product: "Luxury Diamond Collection",
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-44 h-44 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Quote className="w-4 h-4" />
            Customer Stories
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">What Our</span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their jewelry
            experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group flex flex-col min-h-52 relative bg-gradient-to-br from-white to-amber-50/30 rounded-2xl shadow-xl border-2 border-gradient-to-br from-amber-200/30 to-orange-200/30 p-6 transform hover:cursor-pointer transition-all duration-300 hover:shadow-2xl"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-full">
                <Quote className="w-4 h-4 text-amber-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 pb-6 leading-relaxed italic">"{testimonial.text}"</p>

              {/* <div className="mb-4">
                  <span className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                    Product: {testimonial.product}
                  </span>
                </div> */}

              <div className="flex items-center  mt-auto gap-4">
                <div className="relative w-[60px]">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 w-[60px] h-[60px] border-amber-200"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 p-1 rounded-full">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-xl shadow-lg border border-amber-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-lg border border-orange-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                4.9★
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border border-yellow-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-xl shadow-lg border border-amber-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                99%
              </div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
