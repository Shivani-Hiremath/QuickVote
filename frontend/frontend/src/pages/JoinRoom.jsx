import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      await api.post("/rooms/join", { roomId, email });
      navigate(`/vote/${roomId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to join room");
    }
  };

  return (
    <div>
      <h2>Join Room</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleJoin}>
        <input
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />

        <input
          placeholder="Email (for restricted voting)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default JoinRoom;
