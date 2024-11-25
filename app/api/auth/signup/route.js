// app/api/auth/signup/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(`Attempting to create user with email: ${email}`);

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(`Password hashed for ${email}. Hash starts with: ${hashedPassword.substring(0, 10)}...`);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    const userId = result.insertedId;

    console.log(`New user created with ID: ${userId} for email: ${email}`);

    return NextResponse.json({ 
      message: "User created successfully", 
      userId: userId 
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 });
  }
}