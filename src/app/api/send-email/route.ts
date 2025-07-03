// app/api/send-email/route.ts
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { subject, html, to } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({ from: `"HANDMADE ART" <${process.env.EMAIL_USER}>`, to, subject, html });

  return new Response(null, { status: 204 });
}
