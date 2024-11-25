// app/auth/forgot-password/route.js

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';
import { sendPasswordResetEmail } from '@/lib/nodemailer';

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log(`Attempting to process forgot password for email: ${email}`);

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      console.log(`No user found for email: ${email}`);
      return NextResponse.json({ message: "No user found with that email." }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expirationTime = new Date(Date.now() + 3600000); // 1 hour

    await db.collection("users").updateOne(
      { email },
      { $set: { resetPasswordToken: token, resetPasswordExpires: expirationTime } }
    );

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await sendPasswordResetEmail(email, resetUrl);

    console.log(`Password reset email sent to: ${email}`);
    return NextResponse.json({ message: "Password reset email sent." }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ message: "An error occurred during the password reset process" }, { status: 500 });
  }
}