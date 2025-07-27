import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import Cart from "@/models/Cart";
import User from "@/models/User";
import { getCart, getTokenUserId } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user_id = await getTokenUserId();

    if (!user_id) {
      return NextResponse.json({ msg: 'Session Expired. Login.' }, { status: 401 });
    }

    const user = await User.findById(user_id).select('-password');
    // const cart = await Cart.findOne({ user_id: new Types.ObjectId(user_id) }).select('-password');
    const cart = await getCart(new Types.ObjectId(user_id));

    return NextResponse.json({ user, cart }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const user_id = await getTokenUserId();
    const updated_cart = await req.json();
  
    if (!user_id) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }
    await Cart.updateOne({ 
      user_id: new Types.ObjectId(user_id) }, 
      updated_cart, 
    );
    const cart = await getCart(new Types.ObjectId(user_id));
  
    return NextResponse.json({ cart, msg: 'Cart Updated' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'Failed to update Cart.' }, { status: 500 });
  }
}
