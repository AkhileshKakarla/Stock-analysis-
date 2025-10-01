import React from "react";
import StockTicker from "../components/StockTicker";
import Watchlist from "../components/Watchlist";
import Chatbot from "../components/Chatbot";

export default function HomePage() {
  return (
    <div style={{ background: "#18181b", minHeight: "100vh", padding: 20, color: "#fff" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontFamily: "Roboto", fontWeight: 700 }}>EQUIALERT</h1>
        <div>
          <button style={{ marginRight: 12, fontSize: 20, cursor: "pointer", background: "none", border: "none", color: "#00FF7F" }}>🔔</button>
          <button style={{ fontSize: 20, cursor: "pointer", background: "none", border: "none", color: "#00FF7F" }}>👤</button>
        </div>
      </header>
      <StockTicker />
      <Watchlist />
      <Chatbot />
    </div>
  );
}
