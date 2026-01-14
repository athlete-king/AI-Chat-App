import { NextResponse } from "next/server";
import { createConversation, insertMessage } from "@/lib/db";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const bearer = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "").trim() : "";
    const apiKeyHeader = req.headers.get("x-api-key") ?? "";
    const clientKey = bearer || apiKeyHeader;

    if (process.env.API_CLIENT_KEY && clientKey !== process.env.API_CLIENT_KEY) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const messages = body.messages;
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "invalid messages" }, { status: 400 });
    }

    const conversationId = await createConversation();

    for (const m of messages) {
      const content = m.message ?? m.content ?? "";
      await insertMessage(conversationId, m.role, content);
    }

    // To get response from OpenAI API
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages.map((m: any) => ({ role: m.role, content: m.message ?? m.content })),
        max_tokens: 1024,
      }),
    });

    if (!openaiRes.ok) {
      const text = await openaiRes.text();
      console.error("OpenAI error:", openaiRes.status, text);
      return NextResponse.json({ error: text }, { status: openaiRes.status || 500 });
    }
    
    const data = await openaiRes.json();
    const assistantText =
      data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? "";

    await insertMessage(conversationId, "assistant", assistantText);

    return NextResponse.json({ assistant: assistantText });
  } catch (err: any) {
    console.error("API error:", err?.stack ?? err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}