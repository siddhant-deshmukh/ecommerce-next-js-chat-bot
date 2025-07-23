import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export default function CollectionsGrid() {
  const collections = [
    {
      title: "Diamond Rings",
      description: "Exquisite diamond rings for every occasion",
      image: "/hero/earing-1-MD.jpg",
      itemCount: "120+ Items",
      featured: false,
    },
    {
      title: "Gold Necklaces",
      description: "Elegant gold necklaces crafted with precision",
      image: "/hero/gem-1-SD.jpg",
      itemCount: "85+ Items",
      featured: false,
    },
    {
      title: "Pearl Earrings",
      description: "Classic pearl earrings for timeless elegance",
      image: "/hero/necklace-1-HD.jpg",
      itemCount: "95+ Items",
      featured: true,
    },
    {
      title: "Silver Bracelets",
      description: "Modern silver bracelets with contemporary design",
      image: "/hero/earing-2-SD.jpg",
      itemCount: "70+ Items",
      featured: false,
    },
    {
      title: "Wedding Collection",
      description: "Special pieces for your most important day",
      image: "/hero/ring-dark-bg-1-SD.jpg",
      itemCount: "150+ Items",
      featured: false,
    },
    // {
    //   title: "Vintage Jewelry",
    //   description: "Timeless vintage pieces with historical charm",
    //   image: "/hero/ring-dark-bg-1-SD.jpg",
    //   itemCount: "60+ Items",
    //   featured: false,
    // },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gradient px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Our Collections
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">Explore Our</span>
            <br />
            <span className="text-gradient">
              Jewelry Collections
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections, each piece telling its own story of craftsmanship and elegance.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient-amber overflow-hidden transform hover:cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                collection.featured ? "lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              {/* Featured Badge */}
              {collection.featured && (
                <div className="absolute top-4 right-4 z-20 badge-gradient px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}

              {/* Image Container */}
              <div className={`relative overflow-hidden ${collection.featured ? "h-[700px]" : "h-64"}`}>
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  width={300}
                  height={collection.featured ? 600 : 300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-black  transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <span className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                    {collection.itemCount}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{collection.description}</p>

                <Button
                  variant="outline"
                  className="w-full border-2 border-amber-400 text-black hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:border-amber-500 transition-all duration-300 group-hover:shadow-lg bg-transparent"
                >
                  View Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
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
