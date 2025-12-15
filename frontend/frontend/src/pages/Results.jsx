import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Results = () => {
  const { roomId } = useParams();
  const [results, setResults] = useState({});
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/rooms/results/${roomId}`);
        setResults(res.data.results);
        setTotal(res.data.totalVotes);
        setTitle(res.data.roomTitle);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch results");
      }
    };

    fetchResults();
  }, [roomId]);

  return (
    <div>
      <h2>Results: {title}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Total Votes: {total}</p>

      <ul>
        {Object.entries(results).map(([option, count]) => (
          <li key={option}>
            {option}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
