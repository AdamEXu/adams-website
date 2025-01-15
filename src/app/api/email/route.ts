import { NextResponse } from "next/server";

// Optional: Add rate limiting
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10; // Max requests per window
const ipRequests = new Map<string, { count: number; timestamp: number }>();

export async function GET(request: Request) {
  // Optional: Basic rate limiting by IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const ipData = ipRequests.get(ip);

  if (ipData) {
    if (now - ipData.timestamp > RATE_LIMIT_WINDOW) {
      ipRequests.set(ip, { count: 1, timestamp: now });
    } else if (ipData.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    } else {
      ipRequests.set(ip, {
        count: ipData.count + 1,
        timestamp: ipData.timestamp,
      });
    }
  } else {
    ipRequests.set(ip, { count: 1, timestamp: now });
  }

  // Return your actual email
  return NextResponse.json({
    email: process.env.EMAIL_ADDRESS,
  });
}
