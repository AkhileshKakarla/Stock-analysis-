import React from "react";

export default function AlertButton({ onClick, active }) {
  return (
    <button
      style={{
        background: active ? "#2ecc71" : "#32323c",
        color: active ? "#fff" : "#00FF7F",
        border: "none",
        borderRadius: 20,
        padding: "8px 18px",
        fontWeight: 700,
        margin: 5,
        cursor: "pointer",
        transition: "background 0.2s"
      }}
      onClick={onClick}
    >
      {active ? "Alert Set" : "Set Alert"}
    </button>
  );
}
