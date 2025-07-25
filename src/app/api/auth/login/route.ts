import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { createToken, getCart } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await dbConnect.connect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    const userJSON = user.toJSON();
    const cart = await getCart(userJSON._id)
    const response = NextResponse.json({ user: { ...userJSON, password: '' }, cart });
    const token = createToken(user._id.toString());

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
