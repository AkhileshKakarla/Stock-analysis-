import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StockTicker() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const getStocks = async () => {
      const res = await axios.get("http://localhost:5000/api/ticker");
      setStocks(res.data);
    };
    getStocks();
    const intv = setInterval(getStocks, 5000);
    return () => clearInterval(intv);
  }, []);
  return (
    <div style={{ background: "#18181b", color: "#fff", fontFamily: "Roboto", padding: 8 }}>
      <marquee>
        {stocks.map(s => (
          <span key={s.ticker} style={{ marginRight: 20 }}>
            <img src={s.logoUrl} alt="" style={{ width: 18, verticalAlign: "middle" }} />
            {s.name}: ₹{s.price}{" "}
            <span style={{ color: s.change >= 0 ? "#00FF7F" : "#FF4C4C" }}>
              {s.change >= 0 ? "▲" : "▼"} {s.change}%
            </span>
          </span>
        ))}
      </marquee>
    </div>
  );
}
