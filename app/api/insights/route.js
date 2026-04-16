export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, parseAs } = body;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: "Anthropic API error", detail: err }, { status: 500 });
    }

    const data = await res.json();
    const raw = data.content?.map(b => b.text || "").join("") || "";

    // Strip markdown code fences
    const clean = raw
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    // If caller wants a parsed object returned directly
    if (parseAs === "object") {
      const s = clean.indexOf("{");
      const e = clean.lastIndexOf("}");
      if (s !== -1 && e !== -1) {
        try {
          const parsed = JSON.parse(clean.slice(s, e + 1));
          return Response.json(parsed);
        } catch {
          return Response.json({ raw });
        }
      }
      return Response.json({ raw });
    }

    // Default: return the full Anthropic response so the client can parse it
    return Response.json(data);

  } catch (err) {
    return Response.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}
