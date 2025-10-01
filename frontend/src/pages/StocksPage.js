import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartRange, setChartRange] = useState("1M");

  useEffect(() => {
    if (!selectedStock) return;
    const fetchChart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stocks/${selectedStock.ticker}/chart`, {
          params: { range: chartRange }
        });
        setChartData(res.data);
      } catch {
        setChartData([]);
      }
    };
    fetchChart();
  }, [selectedStock, chartRange]);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await axios.get("http://localhost:5000/api/stocks/search", { params: { q: searchTerm } });
      setResults(res.data);
    } catch {
      setResults([]);
    }
  };

  return (
    <div style={{ background: "#18181b", minHeight: "100vh", padding: 20, color: "#fff" }}>
      <h1 style={{ fontFamily: "Roboto", fontWeight: 700 }}>Stocks</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search stocks by ticker or name"
          style={{
            padding: 10, borderRadius: 8, border: "1px solid #444",
            background: "#222", color: "#fff", width: "300px", marginRight: 10
          }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 16px", cursor: "pointer", borderRadius: 8, background: "#00FF7F", border: "none", fontWeight: "bold", color: "#18181b" }}>
          Search
        </button>
      </div>
      <div style={{ marginTop: 24 }}>
        {results.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflowY: "auto", marginBottom: 20 }}>
            {results.map(stock => (
              <li
                key={stock.ticker}
                onClick={() => setSelectedStock(stock)}
                style={{
                  cursor: "pointer", padding: 8, borderBottom: "1px solid #333",
                  background: selectedStock?.ticker === stock.ticker ? "#333" : "transparent"
                }}
              >
                {stock.ticker} - {stock.name}
              </li>
            ))}
          </ul>
        )}
        {selectedStock && (
          <div>
            <h2>{selectedStock.name} ({selectedStock.ticker})</h2>
            <div>
              <label>Chart range: </label>
              {["1D", "1W", "1M", "1Y", "5Y"].map(r => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  style={{
                    margin: 3, background: r === chartRange ? "#00FF7F" : "#222",
                    border: "none", borderRadius: 4, padding: "6px 12px",
                    color: r === chartRange ? "#18181b" : "#fff", cursor: "pointer"
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              {/* Chart rendering placeholder */}
              {chartData && chartData.length > 0 ? (
                <pre style={{ color: "#00FF7F", maxHeight: 300, overflowY: "scroll", background: "#121212", padding: 12, borderRadius: 8 }}>
                  {JSON.stringify(chartData, null, 2)}
                </pre>
              ) : (
                <div style={{ color: "#888" }}>No chart data available.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
