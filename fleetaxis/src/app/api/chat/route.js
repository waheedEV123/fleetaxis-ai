import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are FleetAxis AI — an expert AI Operating System for Fleet Intelligence, representing Waheed Syed of FleetAxis Advisory.

Today's date is ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}.

You are an expert across all fleet management domains:
- Fleet Analysis: utilisation, efficiency, right-sizing, cost per km, fleet health scoring
- EV Transition: readiness scoring, pilot planning, vehicle roadmaps, EV model recommendations
- Charging Infrastructure: AC/DC requirements, depot power, load balancing, OCPP standards
- TCO & ROI: ICE vs EV comparison, payback periods, 5-year lifecycle analysis
- Predictive Maintenance: failure trends, service history analysis, risk scoring
- Operations: route optimisation, driver behaviour, idle time, productivity metrics
- ESG & Sustainability: CO₂ calculation, Net Zero tracking, UAE/GCC/EU policy compliance

When you have quantitative answers, output metric cards using this exact format on separate lines:
METRICS: [value] | [label] | [unit/description]

Example:
METRICS: 25 | EVs Recommended | for pilot phase
METRICS: 3.2 Years | Payback Period | ROI timeline
METRICS: ₹1.82 Cr | Annual Cost Saving | vs current ICE fleet
METRICS: 180 Tonnes | CO₂ Reduction | per year

Always use web search for current EV models, incentives, and pricing. Be direct and consultative. You represent FleetAxis Advisory.`;

const PLAN_LIMITS = { trial: 5, starter: 50, professional: 300, enterprise: 999999 };
const usageStore = new Map();

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return Response.json({ error: "ANTHROPIC_API_KEY is not configured" }, { status: 500 });

  try {
    const { messages, username, plan = "trial" } = await req.json();
    if (!messages || !Array.isArray(messages)) return Response.json({ error: "Invalid messages" }, { status: 400 });

    const limit = PLAN_LIMITS[plan] ?? 5;
    const key = username || "anonymous";
    const used = usageStore.get(key) || 0;
    if (used >= limit) return Response.json({ error: "query_limit_reached", used, limit, plan }, { status: 429 });

    const client = new Anthropic({ apiKey });
    let finalText = "";

    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      });

      if (response.stop_reason === "tool_use") {
        const toolResults = response.content.filter(b => b.type === "tool_use").map(t => ({
          type: "tool_result", tool_use_id: t.id,
          content: t.output || `Search completed for: ${t.input?.query || "fleet information"}`,
        }));
        const fu = await client.messages.create({
          model: "claude-sonnet-4-5",
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: "assistant", content: response.content }, { role: "user", content: toolResults }],
        });
        finalText = fu.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
      } else {
        finalText = response.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
      }
    } catch (searchErr) {
      const fallback = await client.messages.create({
        model: "claude-sonnet-4-5", max_tokens: 1500, system: SYSTEM_PROMPT,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      });
      finalText = fallback.content?.[0]?.text || "";
    }

    usageStore.set(key, used + 1);
    return Response.json({ content: finalText || "No response.", usage: { used: used + 1, limit, plan } });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
