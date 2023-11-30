// HackerRankLeaderboard.js
import { useEffect, useState } from "react";
import axios from "axios";

const HackerRankLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const apiKey = process.env.REACT_APP_HACKERRANK_API_KEY;

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "https://www.hackerrank.com/rest/contests/master/leaderboard?limit=10",
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (response.data.models) {
          setLeaderboardData(response.data.models);
        }
      } catch (error) {
        console.error("Error fetching HackerRank leaderboard:", error);
      }
    };

    fetchLeaderboardData();
  }, [apiKey]);

  return (
    <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-900/10 mt-4">
      <h2 className="text-lg font-semibold text-gray-400">HackerRank Leaderboard</h2>
      <ul>
        {leaderboardData.map((user) => (
          <li key={user.hacker_id}>
            {user.hacker_rank} - {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HackerRankLeaderboard;
