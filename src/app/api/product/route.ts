import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect.connect();

    const products = await Product.aggregate([
      { $sort: { isFeatured: -1, isBestSeller: -1, avg_rating: -1 } },

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