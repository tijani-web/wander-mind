export const sendMessageToAI = async (message) => {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are a compassionate and emotionally intelligent mental wellness companion. 
            Your goal is to make users feel calm, safe, and heard. 
            Respond with empathy, kindness, and without judgment. 
            Ask thoughtful follow-up questions when appropriate, and let the user lead the pace of the conversation.
            Avoid giving clinical advice or diagnoses — you are simply here to support, reflect, and listen. 
            Keep responses gentle, clear, and comforting.
          `,
        },
        { role: "user", content: message },
      ],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in AI response");
  return content;
};
