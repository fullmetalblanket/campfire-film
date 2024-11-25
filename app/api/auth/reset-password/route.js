// app/api/auth/reset-password/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  let client;
  try {
    const { email, token, newPassword } = await req.json();
    console.log(`Attempting to reset password for email: ${email}`);

    if (!email || !token || !newPassword) {
      console.log('Missing required fields:', { email: !!email, token: !!token, newPassword: !!newPassword });
      return NextResponse.json({ message: "Invalid input: missing required fields" }, { status: 400 });
    }

    client = await clientPromise;
    console.log('MongoDB client retrieved');
    
    const db = client.db(process.env.MONGODB_DB);
    console.log('Database selected');

    // Test connection
    await db.command({ ping: 1 });
    console.log("Connected successfully to MongoDB");
    
    const user = await db.collection("users").findOne({ 
      email, 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      console.log(`Invalid or expired token for email: ${email}`);
      return NextResponse.json({ message: "Password reset token is invalid or has expired." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const updateResult = await db.collection("users").updateOne(
      { email },
      { 
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" }
      }
    );

    if (updateResult.modifiedCount !== 1) {
      console.log(`Failed to update password for email: ${email}`);
      return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
    }

    console.log(`Password successfully reset for email: ${email}`);
    return NextResponse.json({ message: "Password successfully reset. Please log in with your new password." }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: "An unexpected error occurred. Please try again later.", error: error.message }, { status: 500 });
  }
}