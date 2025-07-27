import { getTokenUserId } from "@/lib/auth";
import Wishlist from "@/models/Wishlist";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req: NextRequest) {
  try { 
    const user_id = await getTokenUserId();

    if(!user_id) return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 401 });

    const products = await Wishlist.find({
      user_id,
    });

    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try { 
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get('product_id');
    if(!product_id) return NextResponse.json({ msg: 'Invalid Product id' }, { status: 400 });

    const user_id = await getTokenUserId();
    if(!user_id) return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 401 });

    await Wishlist.create({
      user_id,
      product_id,
    });

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ msg: 'Failed to add in wishlist' }, { status: 500 });
  }
}

export async function DELETE (req: NextRequest) {
  try { 
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get('product_id');
    if(!product_id) return NextResponse.json({ msg: 'Invalid Product id' }, { status: 400 });

    const user_id = await getTokenUserId();
    if(!user_id) return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 401 });

    await Wishlist.deleteOne({
      user_id,
      product_id,
    });

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ msg: 'Failed to remove from wishlist' }, { status: 500 });
  }
}