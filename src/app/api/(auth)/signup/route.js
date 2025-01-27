import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [];

export async function POST(request) {
  const { email, password } = await request.json();

  // Check if user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (in memory for now)
  const user = { email, password: hashedPassword };
  users.push(user);

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 201 });
}