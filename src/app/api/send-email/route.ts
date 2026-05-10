export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { createServerSupabaseClient } from "@/shared/supabase/server";

const COMPANY_EMAIL = "sobrepoxidev@gmail.com";

const sendEmailSchema = z.object({
  subject: z.string().min(1).max(500),
  html: z.string().min(1),
  to: z.string().email(),
});

function getAllowedOrigins(req: NextRequest): Set<string> {
  const allowed = new Set<string>();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).origin);
    } catch {
      // invalid env value, fallback to host header
    }
  }
  const host = req.headers.get("host");
  if (host) {
    const proto = req.headers.get("x-forwarded-proto") || "https";
    allowed.add(`${proto}://${host}`);
  }
  return allowed;
}

function isSameOrigin(req: NextRequest): boolean {
  const allowed = getAllowedOrigins(req);
  const origin = req.headers.get("origin");
  if (origin && allowed.has(origin)) return true;
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      if (allowed.has(new URL(referer).origin)) return true;
    } catch {
      // invalid referer URL
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = sendEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { subject, html, to } = parsed.data;

    const userEmail = session.user.email;
    if (to !== userEmail && to !== COMPANY_EMAIL) {
      return NextResponse.json({ error: "Recipient not allowed" }, { status: 400 });
    }

    console.log(
      JSON.stringify({
        event: "send-email-call",
        timestamp: new Date().toISOString(),
        origin: req.headers.get("origin"),
        userId: session.user.id,
        to,
        subject,
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"SobrePoxi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("[send-email] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
