import Cart from '@/models/Cart';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const createToken = (user_id: string) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { user_id: string } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };
};

export const getTokenUserId = async () => {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    const { user_id } = verifyToken(token);
    return user_id;
  } catch {
    return null;
  }
};

export async function getCart(user_id: Types.ObjectId) {
  try {
    const carts = await Cart.aggregate([
      { $match: { user_id } },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $addFields: {
          products: {
            $map: {
              input: '$products',
              as: 'product',
              in: {
                $mergeObjects: [
                  '$$product',
                  {
                    product: {
                      $arrayElemAt: [
                        '$productDetails',
                        {
                          $indexOfArray: ['$productDetails._id', '$$product.product_id']
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          productDetails: 0 // Remove the separate productDetails array
        }
      }
    ]).option({ lean: true });
    return carts[0];
  } catch {
    return null;
  }
}