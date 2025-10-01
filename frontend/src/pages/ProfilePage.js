import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", avatar: "" });
  const [editedName, setEditedName] = useState("");
  const [editedAvatar, setEditedAvatar] = useState("");

  useEffect(() => {
    // Dummy user fetch - replace with real user context/auth
    const fetchProfile = async () => {
      // Example: fetch user profile from backend here
      setProfile({ name: "Demo User", email: "demo@example.com", avatar: "" });
      setEditedName("Demo User");
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    // Save profile edits API call
    try {
      await axios.put("http://localhost:5000/api/auth/profile", {
        userId: "DEMO_USER_ID",
        name: editedName,
        avatar: editedAvatar
      });
      setProfile({ ...profile, name: editedName, avatar: editedAvatar });
      alert("Profile updated");
    } catch {
      alert("Failed to update");
    }
  };

  return (
    <div style={{ background: "#18181b", minHeight: "100vh", padding: 20, color: "#fff" }}>
      <h1 style={{ fontFamily: "Roboto", fontWeight: 700 }}>Profile</h1>
      <div style={{ maxWidth: 560 }}>
        <label>Name</label><br />
        <input
          style={{ width: "100%", padding: 8, background: "#222", border: "1px solid #444", color: "#fff", borderRadius: 6 }}
          value={editedName}
          onChange={e => setEditedName(e.target.value)}
        /><br /><br />
        <label>Avatar URL</label><br />
        <input
          style={{ width: "100%", padding: 8, background: "#222", border: "1px solid #444", color: "#fff", borderRadius: 6 }}
          value={editedAvatar}
          onChange={e => setEditedAvatar(e.target.value)}
          placeholder="Paste URL here"
        /><br /><br />
        {editedAvatar && <img src={editedAvatar} alt="Avatar preview" style={{ maxWidth: 120, marginBottom: 24, borderRadius: "50%" }} />}
        <button onClick={handleSave} style={{
          padding: "10px 16px", fontWeight: "bold", background: "#00FF7F", border: "none",
          borderRadius: 8, cursor: "pointer", color: "#18181b"
        }}>
          Save
        </button>
      </div>
    </div>
  );
}
