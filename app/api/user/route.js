// app/api/user/route.js
import { NextResponse } from 'next/server';
import sql, { connectToDatabase } from '../../../lib/db';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  await connectToDatabase();

  try {
    const result = await sql.query`SELECT * FROM Users WHERE UserName = ${username}`;
    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Database query failed:', err);
    return NextResponse.json({ message: 'Database query failed', error: err }, { status: 500 });
  }
}