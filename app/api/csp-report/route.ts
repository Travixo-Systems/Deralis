import { NextRequest, NextResponse } from "next/server";

// Browsers POST CSP violation reports here. We log to stderr so Vercel's
// log stream captures them. Watch the logs after a deploy to catch any
// newly-blocked third-party resources (e.g. a changed Clarity subdomain)
// before they silently cost you data.
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    if (body.length > 10_000) {
      return NextResponse.json({ ok: true }, { status: 204 });
    }
    let parsed: unknown = body;
    try {
      parsed = JSON.parse(body);
    } catch {
      // Some browsers send application/csp-report as non-strict JSON; log raw.
    }
    console.error("[csp-violation]", JSON.stringify(parsed));
  } catch {
    // Never let report handling throw — it's a fire-and-forget endpoint.
  }
  return new NextResponse(null, { status: 204 });
}
