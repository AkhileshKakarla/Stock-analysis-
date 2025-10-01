import React, { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me about stocks or market news." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    setMessages(msgs => [...msgs, { from: "user", text: input }]);
    setInput("");
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", { query: input });
      setMessages(msgs => [...msgs, { from: "bot", text: res.data.answer }]);
    } catch {
      setMessages(msgs => [...msgs, { from: "bot", text: "Sorry, I couldn't fetch an answer." }]);
    }
  };

  return (
    <>
      <button
        style={{
          position: "fixed", right: 28, bottom: 28, zIndex: 99,
          borderRadius: "50%", width: 56, height: 56, fontSize: 32,
          background: "#24242f", color: "#00FF7F", border: 0, cursor: "pointer"
        }}
        onClick={() => setVisible(!visible)}
      >💬</button>
      {visible && (
        <div style={{
          position: "fixed", right: 30, bottom: 100, width: 330, height: 400,
          background: "#1a1d24", color: "#fff", borderRadius: 14, boxShadow: "0 0 20px #222", padding: 16, zIndex: 200
        }}>
          <div style={{ height: 300, overflowY: "auto", marginBottom: 10 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                textAlign: msg.from === "user" ? "right" : "left",
                marginBottom: 6,
                color: msg.from === "user" ? "#00FF7F" : "#fff"
              }}>{msg.text}</div>
            ))}
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              width: "80%", borderRadius: 8, padding: 8,
              border: "1px solid #444", marginRight: 8, background: "#24242f", color: "#fff"
            }}
            onKeyDown={e => e.key === "Enter" ? handleSend() : null}
            placeholder="Ask about stocks or news..."
          />
          <button onClick={handleSend} style={{
            background: "#00FF7F", color: "#18181b", fontWeight: 700,
            border: "none", borderRadius: 8, padding: "8px 12px"
          }}>Send</button>
        </div>
      )}
    </>
  );
}
