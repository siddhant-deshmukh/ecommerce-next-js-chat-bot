import { getTokenUserId } from "@/lib/auth";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import OrderProduct, { ICreateOrderProdcutSchema } from "@/models/OrderProduct";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user_id_str = await getTokenUserId();
    if (!user_id_str) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
    const user_id = new Types.ObjectId(user_id_str);

    const payload = await req.json();

    let productsToOrder: ICreateOrderProdcutSchema[] = [];

    const cart = await Cart.findOne({ user_id }).session(session);
    if (!cart) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: 'Cart not found or does not belong to user' }, { status: 404 });
    }

    if (
      !['checkout_cart', 'buy_single_product'].includes(payload.action) ||
      (payload.action == 'checkout_cart' && cart.products.length === 0) ||
      (payload.action == 'buy_single_product' && !payload.productDetails)
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ msg: 'Invalid payload' }, { status: 400 });
    }

    if (payload.action === 'checkout_cart') {
      productsToOrder = cart.products.map((p) => ({
        product_id: p.product_id,
        discount_id: p.discount_id,
        final_amount: p.final_amount,
        original_amt: p.original_amt,
        discount: p.discount,
        quantity: p.quantity,
        size: p.size,
        user_id,
      }));

      await Cart.findOneAndUpdate({ user_id }, { $set: { products: [] } }, { session });

    } else if (payload.action === 'buy_single_product') {
      const product = payload.productDetails;

      const the_products = cart.products.filter((ele) => {
        return !(product.product_id == ele.product_id && product.size == ele.size)
      })
      productsToOrder = [
        {
          ...payload.productDetails,
          user_id
        }
      ]
      if (the_products.length != cart.products.length) {
        await Cart.findOneAndUpdate({ user_id }, { $set: { products: the_products } }, { session });
      }
    }

    const newOrder = new Order({
      user_id
    });
    await newOrder.save({ session });

    const orderProducts = productsToOrder.map(p => ({
      order_id: newOrder._id,
      product_id: p.product_id,
      user_id: p.user_id,
      discount_id: p.discount_id,
      final_amount: p.final_amount,
      original_amt: p.original_amt,
      discount: p.discount,
      quantity: p.quantity,
      size: p.size,
    }));

    await OrderProduct.insertMany(orderProducts, { session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      msg: 'Order created successfully',
      orderId: newOrder._id,
      productsCount: productsToOrder.length,
    }, { status: 201 });

  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ msg: 'Failed to create order' }, { status: 500 });
  }
}