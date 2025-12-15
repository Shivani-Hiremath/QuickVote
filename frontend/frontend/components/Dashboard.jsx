import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name}</h2>

      <button onClick={() => navigate("/create-room")}>
        Create Room
      </button>

      <button onClick={() => navigate("/join-room")} style={{ marginLeft: 10 }}>
        Join Room
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
