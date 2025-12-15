import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>QuickVote</h1>
      <p>A secure real-time voting app.</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/signup">
        <button style={{ marginLeft: "10px" }}>Signup</button>
      </Link>
    </div>
  );
}
