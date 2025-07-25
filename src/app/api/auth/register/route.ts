import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { createToken, getCart } from '@/lib/auth';
import Cart from '@/models/Cart';

export async function POST(req: Request) {
  try {
    await dbConnect.connect();
    const { name, email: body_email, password } = await req.json();

    const email = body_email.trim().toLowerCase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const newCart = await Cart.create({ user_id: newUser._id });

    const token = createToken(newUser._id.toString());

    const user = newUser.toJSON();
    const cart = await getCart(user._id)
    const response = NextResponse.json({ message: 'New User Created', user_id: newUser._id, token, user: { ...user, password: '' }, cart }, { status: 201 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Some Error Occured' }, { status: 500 });
  }
}
