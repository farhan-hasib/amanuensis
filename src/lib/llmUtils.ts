export async function getLLMResponse(
  text: string,
  prompt: string,
  apiKey: string,
  model: string,
): Promise<string> {
  const response = await fetch("/api/llm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, prompt, apiKey, model }),
  });
  const data = await response.json();
  return data.message;
}
