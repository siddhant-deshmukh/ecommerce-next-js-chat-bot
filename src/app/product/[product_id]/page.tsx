import {
  Heart,
  ChevronRight,
  Star,
  Check,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"
import CustomizationRequest from "./components/CustomizationRequest"
import ProductImgGallery from "./components/ImgSection"
import dbConnect from "@/lib/dbConnect"
import Product from "@/models/Product"
import { Types } from "mongoose"
import { IProduct } from "@/models"
import ActionBts from "./components/ActionBtns"
import { cache } from "react"
import { getTokenUserId } from "@/lib/auth"

interface ProductPageProps {
  params: Promise<{ product_id: string }>;
}

const getProduct = cache(async (product_id: string, user_id?: string | null) => {
  await dbConnect.connect();

  const products = await Product.aggregate([
    { $match: { _id: new Types.ObjectId(product_id) } },

    //* Checking if is liked / added in wishlist
    ...(user_id ? [
      {
        $lookup: {
          from: 'wishlists',
          let: { productId: '$_id' }, // Define a variable for the current product's _id
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$product_id', '$$productId'] }, // Match product_id from the outer document
                    { $eq: ['$user_id', new Types.ObjectId(user_id)] }             // Match the specific user_id
                  ]
                }
              }
            },
            { $project: { _id: 1 } } // Only project _id if you don't need other wishlist fields
          ],
          as: 'userWishlistEntry', // This array will now only contain the entry for the specific user (or be empty)
        }
      },
      {
        $addFields: {
          // Check if the 'userWishlistEntry' array has any elements
          liked: {
            $gt: [{ $size: '$userWishlistEntry' }, 0]
          },
          // Keep your existing active_discount logic
          active_discount: {
            $ifNull: [{ $arrayElemAt: ['$active_discount', 0] }, {}]
          }
        }
      },
      {
        $project: {
          userWishlistEntry: 0, // Remove the intermediate field from the final output
        }
      },
    ] : []),

    //* Add the lastOrder field
    ...(user_id ? [
      {
        $lookup: {
          from: 'orderproducts',
          let: { currentProductId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$product_id', '$$currentProductId'] },
                    { $eq: ['$user_id', new Types.ObjectId(user_id)] }
                  ]
                }
              }
            },
            { $sort: { '_id': -1 as const } },
            { $limit: 1 }         
          ],
          as: 'last_order'
        }
      },
      {
        $addFields: {
          last_order: { $arrayElemAt: ['$last_order', 0] }
        }
      }
    ] : []),

    {
      $lookup: {
        from: 'productspecifications',
        let: { productId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$product_id', '$$productId']
              }
            }
          },
          {
            $project: {
              key: 1,
              value: 1
            }
          }
        ],
        as: 'specifications'
      }
    },
    {
      $lookup: {
        from: 'discounts',
        let: { productId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$product_id', '$$productId'] },
                  { $eq: ['$is_active', true] }
                ]
              }
            }
          },
          { $limit: 1 }
        ],
        as: 'active_discount'
      }
    },
    {
      $addFields: {
        active_discount: {
          $ifNull: [{ $arrayElemAt: ['$active_discount', 0] }, {}]
        }
      }
    },

    {
      $addFields: {
        discount_percentage: {
          $ifNull: ['$active_discount.percentage', 0]
        },
        current_price: {
          $round: [
            {
              $multiply: [
                '$price',
                {
                  $subtract: [
                    1,
                    { $divide: [{ $ifNull: ['$active_discount.percentage', 0] }, 100] }
                  ]
                }
              ]
            },
            2
          ]
        }
      }
    }
  ]).option({ lean: true });

  const product_ = products[0] as IProduct;

  const product = JSON.parse(JSON.stringify(product_)) as IProduct;
  return product
});

export async function generateMetadata({ params }: ProductPageProps) {
  const { product_id } = await params;
  const product = await getProduct(product_id);
  return { title: product.title };
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { product_id } = await params;

  const user_id = await getTokenUserId();

  const product = await getProduct(product_id, user_id)

  const features = [
    "Handcrafted by master jewelers",
    "Ethically sourced diamonds",
    "Complimentary sizing and adjustments",
    "Lifetime warranty",
    "Includes luxury gift packaging",
  ]


  return (
    <div className="py-12 bg-gradient-to-br from-white via-orange-50/10 to-amber-50/20">
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"></div>

      <div className="container  mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <a href="#" className="hover:text-amber-600 transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          {/* <a href="#" className="hover:text-amber-600 transition-colors">
            Jewelry
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="#" className="hover:text-amber-600 transition-colors">
            Rings
          </a>
          <ChevronRight className="w-4 h-4 mx-2" /> */}
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 static lg:sticky top-24 self-start">
            <ProductImgGallery images={[product.main_image, ...product.other_images]} />
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">{product.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.tagline}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(product.avg_rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-gray-700">{product.avg_rating}</span>
                <span className="text-gray-500">({product.total_number_reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ₹{product.current_price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
                <span className="badge-gradient px-2 py-1 rounded text-sm font-medium">
                  Save {product.discount_percentage.toLocaleString()}%
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200"></div>

            <div className="space-y-6">
              <ActionBts product={product} />
            </div>

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
                      {product.specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-amber-50/50 to-orange-50/50"
                            }`}
                        >
                          <td className="py-3 px-4 font-semibold text-black border-b border-amber-100">{spec.key}</td>
                          <td className="py-3 px-4 text-gray-700 border-b border-amber-100">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <CustomizationRequest product={product} />
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
                    "Have professional cleaning twice a year"].map((ele, index) => {
                      return <li key={index} className="flex items-center gap-4">
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
                  {/* <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div> */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-black">₹2,499</span>
                    <span className="text-sm text-gray-500 line-through">₹2,899</span>
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
