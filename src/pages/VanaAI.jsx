import React from "react";
import { Bot, SendHorizontal, UserRound } from "lucide-react";
import { useState } from "react";
import { createVanaReply } from "../lib/agriInsights.js";

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  text: "Share your crop, growth stage, recent weather, and symptoms. I will help organise the next field decision.",
};

export default function VanaAI() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([welcomeMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: trimmedQuestion },
      { id: crypto.randomUUID(), role: "assistant", text: createVanaReply(trimmedQuestion) },
    ]);
    setQuestion("");
  };

  return (
    <main className="page-content">
      <section className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Vana AI</span>
          <h1>Ask Vana AI</h1>
          <p>Vana AI is the agricultural assistant inside DharaOne for crop and climate decisions.</p>
        </div>
      </section>

      <section className="assistant-workspace" aria-label="Vana AI conversation">
        <div className="chat-thread" aria-live="polite">
          {messages.map((message) => (
            <div className={`chat-message ${message.role}`} key={message.id}>
              {message.role === "assistant" ? <Bot aria-hidden="true" size={21} /> : <UserRound aria-hidden="true" size={20} />}
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="vana-question">Question for Vana AI</label>
          <input
            id="vana-question"
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about crop stress, irrigation, pests, or weather risk"
            value={question}
          />
          <button aria-label="Send question" disabled={!question.trim()} title="Send question" type="submit">
            <SendHorizontal aria-hidden="true" size={19} />
          </button>
        </form>
      </section>
    </main>
  );
}
