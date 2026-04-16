export async function POST(req) {
  const { prompt } = await req.json();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();

  // Extract raw text from response
  const raw = data.content?.map(b => b.text || "").join("") || "";

  // Aggressively strip markdown formatting
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Find the JSON object within the response
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    return Response.json({ error: "No JSON found in response", raw });
  }

  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    return Response.json(parsed);
  } catch (e) {
    return Response.json({ error: "Failed to parse JSON", raw });
  }
}
