import React from "react";
import StockTicker from "./components/StockTicker";

function App() {
  return (
    <div style={{ background: "#18181b", minHeight: "100vh", color: "#fff" }}>
      <header style={{ padding: 16, fontWeight: 700, fontFamily: "Roboto", fontSize: 24 }}>
        EQUIALERT
        <span style={{ float: "right" }}>🔔 👤</span>
      </header>
      <StockTicker />
      {/* Add Watchlist, News, and other components as needed */}
    </div>
  );
}

export default App;
