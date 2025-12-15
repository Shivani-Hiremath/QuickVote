import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/create-room")}>
        Create Room
      </button>

      <button onClick={() => navigate("/join-room")}>
        Join Room
      </button>

      <button onClick={() => {
        logout();
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
