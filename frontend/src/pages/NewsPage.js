import React from "react";
import NewsFeed from "../components/NewsFeed";

export default function NewsPage() {
  return (
    <div style={{ background: "#18181b", minHeight: "100vh", padding: 20, color: "#fff" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: "Roboto", fontWeight: 700 }}>Financial News</h1>
      </header>
      <NewsFeed />
    </div>
  );
}
