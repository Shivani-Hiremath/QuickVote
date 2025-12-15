import { useState, useEffect } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const Vote = () => {
  const { roomId } = useParams();
  const [choices, setChoices] = useState(["Option A", "Option B"]); // Example options
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleVote = async () => {
    if (!selected) {
      setError("Select an option first");
      return;
    }

    try {
      await api.post("/rooms/vote", {
        roomId,
        voterId: localStorage.getItem("email") || "guest",
        choice: selected
      });
      setSubmitted(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Vote failed");
    }
  };

  return (
    <div>
      <h2>Vote</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {submitted ? (
        <p>Vote submitted successfully!</p>
      ) : (
        <div>
          {choices.map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                name="vote"
                value={choice}
                checked={selected === choice}
                onChange={() => setSelected(choice)}
              />
              {choice}
            </label>
          ))}

          <button onClick={handleVote}>Submit Vote</button>
        </div>
      )}

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default Vote;
