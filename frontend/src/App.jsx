import React from "react";
import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt })
        }
      );

      const data = await response.json();

      setReply(data.reply || "No response");

    } catch (error) {
      setReply("Backend connection failed");
    }

    setLoading(false);
  }

  return (
    <div style={{
      background: "#050816",
      minHeight: "100vh",
      color: "white",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{fontSize:"50px"}}>
        Nova AI
      </h1>

      <p style={{color:"#94a3b8"}}>
        Free AI chatbot using OpenRouter
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
        style={{
          width: "100%",
          height: "140px",
          marginTop: "20px",
          borderRadius: "20px",
          border: "none",
          background: "#111827",
          color: "white",
          padding: "20px",
          fontSize: "18px"
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "20px",
          padding: "16px 30px",
          borderRadius: "16px",
          border: "none",
          background: "#7c3aed",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {loading ? "Loading..." : "Send"}
      </button>

      <div style={{
        marginTop: "30px",
        background: "#111827",
        padding: "25px",
        borderRadius: "20px",
        whiteSpace: "pre-wrap"
      }}>
        {reply}
      </div>

    </div>
  );
}
