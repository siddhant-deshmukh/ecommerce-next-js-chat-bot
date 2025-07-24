import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { Types } from "mongoose";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ product_id: string }> }
) {
  try {
    const { product_id } = await context.params;
    await dbConnect();


    const products = await Product.aggregate([
      { $match: { _id: new Types.ObjectId(product_id) } },
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
    ]);


    return NextResponse.json({ ...products[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 500 });
  }
}