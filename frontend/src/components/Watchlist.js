import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertButton from "./AlertButton";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const res = await axios.get("http://localhost:5000/api/watchlist?userId=DEMOUSER"); // Replace with real user ID!
      setWatchlist(res.data);
    };
    fetchWatchlist();
  }, []);

  const handleRemove = async (ticker) => {
    await axios.delete(`http://localhost:5000/api/watchlist/${ticker}?userId=DEMOUSER`);
    setWatchlist(watchlist.filter(item => item.ticker !== ticker));
  };

  const handleAlert = (ticker) => {
    // Call alert-setting dialog or API
    alert(`Set alert for ${ticker} (demo)`);
  };

  return (
    <div style={{ margin: "24px 0", padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 14 }}>Watchlist</div>
      {watchlist.length === 0 && <div style={{ color: "#888" }}>No stocks in your watchlist yet.</div>}
      {watchlist.map(stock => (
        <div key={stock.ticker} style={{
          display: "flex", alignItems: "center", background: "#1b1e27",
          marginBottom: 13, borderRadius: 10, padding: 11, boxShadow: "0 1px 4px #1a1a1f"
        }}>
          <img src={stock.logoUrl} alt="" style={{ width: 26, marginRight: 16, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{stock.name} <span style={{
              color: stock.change >= 0 ? "#00FF7F" : "#FF4C4C", marginLeft: 7, fontWeight: 600, fontSize: 15
            }}>{stock.change}%</span></div>
            <div style={{ fontSize: 13, color: "#bbb" }}>{stock.ticker} - ₹{stock.price}</div>
          </div>
          <AlertButton onClick={() => handleAlert(stock.ticker)} />
          <button style={{
            marginLeft: 9, background: "#ff6565", color: "#fff", border: "none",
            borderRadius: 6, padding: "6px 12px", fontWeight: 700, cursor: "pointer"
          }} onClick={() => handleRemove(stock.ticker)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
