import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const url = `http://localhost:5000/api/news${q ? "?q=" + q : ""}`;
      const res = await axios.get(url);
      setNews(res.data);
    };
    fetchNews();
  }, [q, filter]);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 14 }}>
        <input
          placeholder="Search stocks/sectors"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{
            borderRadius: 8, border: "1px solid #444", background: "#222", color: "#fff", padding: 8, marginRight: 8
          }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ borderRadius: 8, padding: 8, background: "#222", color: "#fff" }}>
          <option value="">All</option>
          <option value="india">India</option>
          <option value="banking">Banking</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div>
        {news.map((n, idx) => (
          <div key={idx} style={{
            background: "#21212d", borderRadius: 10, padding: 16, marginBottom: 10,
            boxShadow: "0 2px 8px #18181b"
          }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: "#00FF7F" }}>{n.source?.name} — {new Date(n.publishedAt).toLocaleString()}</div>
            {n.urlToImage && <img src={n.urlToImage} alt="" style={{ width: "100%", borderRadius: 6, marginTop: 8 }} />}
            <div style={{ fontSize: 15, marginTop: 8 }}>{n.description}</div>
            <a href={n.url} target="_blank" rel="noopener noreferrer" style={{ color: "#00FF7F", fontSize: 14 }}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}
