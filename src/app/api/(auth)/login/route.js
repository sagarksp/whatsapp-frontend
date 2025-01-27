import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = []; // Replace with a database in production

export async function POST(request) {
  const { email, password } = await request.json();

  // Find user
  const user = users.find((user) => user.email === email);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}