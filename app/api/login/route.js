// app/api/login/route.js
import { NextResponse } from 'next/server';
import sql, { connectToDatabase } from '../../../lib/db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request) {
  const { username, password } = await request.json();

  await connectToDatabase();

  try {
    const result = await sql.query`SELECT * FROM Users WHERE UserName = ${username}`;

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      // const isPasswordValid = await bcrypt.compare(password, user.Password_);
      const isPasswordValid = password === user.Password_;


      if (isPasswordValid) {
        return NextResponse.json({ message: 'Login successful' });
      } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err) {
    console.error('Database query failed:', err);
    return NextResponse.json({ message: 'Database query failed', error: err }, { status: 500 });
  }
}