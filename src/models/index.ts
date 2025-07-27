import { InferSchemaType } from "mongoose";

import { UserSchema } from "./User";
import { CartSchema, ProductSubSchema } from "./Cart";
import { ProductSchema } from "./Product";
import { CategorySchema } from "./Category";
import { ProductSpecificationSchema } from "./ProductSpecification";

export type UserType = InferSchemaType<typeof UserSchema>;
export type CartType = InferSchemaType<typeof CartSchema>;
export type CartProductSubDocument = InferSchemaType<typeof ProductSubSchema>;
export type ProductType = InferSchemaType<typeof ProductSchema>;
export type CategoryType = InferSchemaType<typeof CategorySchema>;
export type ProductSpecificationType = InferSchemaType<typeof ProductSpecificationSchema>;


export interface ICart {
  _id: string,
  user_id: string,
  products: (CartProductSubDocument & { _id: string, product: ProductType })[],
  createdAt: Date,
}

export interface IProductSpecification {
  product_id: string,
  type: string, 
  key: string,  
  value: string,
}

export interface IDiscount {
  _id: string,
  product_id: string,
  percentage: number,
  is_active: number,
}

export interface IProduct {
  _id: string,
  title: string,
  description: string,
  tagline: string,
  other_images: string[],
  main_image: string,

  available_size: number[],
  price: number,

  liked: boolean,

  avg_rating: number,
  total_number_reviews: number,
  tags: string[],
  isFeatured: boolean,
  isBestSeller: boolean,
  isNewArrival: boolean,
  current_price: number, 
  discount_percentage: number, 
  specifications: IProductSpecification[],

  active_discount: IDiscount
}