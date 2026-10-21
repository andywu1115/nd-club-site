import { NextResponse } from "next/server";

const TRIPO_BASE = "https://openapi.tripo3d.ai/v3";

// Tripo is async: POST /api/tripo/generate hands back a task id, then the
// browser polls this route until the task reports success and carries a
// model URL. The key stays server-side here too.
//
// In Next.js 15+ route params arrive as a Promise, so they are awaited.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const key = process.env.TRIPO_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "TRIPO_API_KEY is not set on the server" },
      { status: 500 },
    );
  }

  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    return NextResponse.json({ error: "bad task id" }, { status: 400 });
  }

  const res = await fetch(`${TRIPO_BASE}/task/${id}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Tripo rejected the request", status: res.status, data },
      { status: res.status },
    );
  }

  return NextResponse.json(data);
}
