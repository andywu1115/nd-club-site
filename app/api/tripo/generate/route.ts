import { NextResponse } from "next/server";

// Server-side proxy for the Tripo generation API.
//
// Why this file exists: the API key must never reach the browser. Anything in
// a "use client" component or NEXT_PUBLIC_* env var is shipped to the visitor
// and is effectively public. This route runs on the server only, so the key
// stays in the environment and the browser only ever talks to our own domain.
//
// Verify the exact path and body shape against Tripo's current docs before
// relying on this in production.
const TRIPO_BASE = "https://openapi.tripo3d.ai/v3";

export async function POST(request: Request) {
  const key = process.env.TRIPO_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "TRIPO_API_KEY is not set on the server" },
      { status: 500 },
    );
  }

  let body: { prompt?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }
  if (prompt.length > 400) {
    return NextResponse.json({ error: "prompt is too long" }, { status: 400 });
  }

  const res = await fetch(`${TRIPO_BASE}/task`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "text_to_model", prompt }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Pass through a useful status but never the key or raw upstream headers.
    return NextResponse.json(
      { error: "Tripo rejected the request", status: res.status, data },
      { status: res.status },
    );
  }

  return NextResponse.json(data);
}
