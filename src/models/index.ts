import { InferSchemaType } from "mongoose";
import { CartSchema } from "./Cart";
import { CategorySchema } from "./Category";
import { ProductSchema } from "./Product";
import { ProductSpecificationSchema } from "./ProductSpecification";

export type CartType = InferSchemaType<typeof CartSchema>;
export type CategoryType = InferSchemaType<typeof CategorySchema>;
export type ProductType = InferSchemaType<typeof ProductSchema>;
export type ProductSpecificationType = InferSchemaType<typeof ProductSpecificationSchema>;
