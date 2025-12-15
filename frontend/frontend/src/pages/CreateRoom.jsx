import { useState } from "react";
import api from "../services/api";

const CreateRoom = () => {
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("open");
  const [emails, setEmails] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const body = {
        title,
        mode,
        allowedEmails:
          mode === "restricted"
            ? emails.split(",").map(e => e.trim())
            : []
      };

      const res = await api.post("/rooms/create", body);
      setRoomId(res.data.roomId);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <div>
      <h2>Create Room</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCreate}>
        <input
          placeholder="Room title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label>
            <input
              type="radio"
              value="open"
              checked={mode === "open"}
              onChange={() => setMode("open")}
            />
            Open Voting
          </label>

          <label>
            <input
              type="radio"
              value="restricted"
              checked={mode === "restricted"}
              onChange={() => setMode("restricted")}
            />
            Restricted Voting
          </label>
        </div>

        {mode === "restricted" && (
          <textarea
            placeholder="Allowed emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        )}

        <button type="submit">Create</button>
      </form>

      {roomId && (
        <p>
          Room created! <br />
          Room ID: <b>{roomId}</b>
        </p>
      )}
    </div>
  );
};

export default CreateRoom;
