import { getTokenUserId } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect.connect();
    const user_id = await getTokenUserId();

    const products = await Product.aggregate([
      { $sort: { is_featured: -1, is_best_seller: -1, avg_rating: -1 } },

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
        // {
        //   $project: {
        //     userWishlistEntry: 0, // Remove the intermediate field from the final output
        //   }
        // },
      ] : []),
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
    ]);


    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 500 });
  }
}