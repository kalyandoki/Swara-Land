import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [juryMention, setJuryMention] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Correct URLs
  const LEADERBOARD_URL =
    "https://docs.google.com/spreadsheets/d/1M_bNWTAnb-UL-oRgpi6Jps0yVKe0R7F3nByrbRn79GM/gviz/tq?tqx=out:json&gid=1844933158";
  const JURY_URL =
    "https://docs.google.com/spreadsheets/d/1M_bNWTAnb-UL-oRgpi6Jps0yVKe0R7F3nByrbRn79GM/gviz/tq?tqx=out:json&gid=560658147";

  // Helper: parse Google JSON
  const parseGoogleSheet = (text) => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    return json.table.rows.map((row) =>
      row.c.map((cell) => (cell ? cell.v : ""))
    );
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Leaderboard
      const leaderboardRes = await fetch(LEADERBOARD_URL);
      const leaderboardText = await leaderboardRes.text();
      const leaderboardRows = parseGoogleSheet(leaderboardText);
      setData(leaderboardRows);

      // Jury Mention
      const juryRes = await fetch(JURY_URL);
      const juryText = await juryRes.text();
      const juryRows = parseGoogleSheet(juryText);
      if (juryRows.length > 0 && juryRows[0][0]) {
        setJuryMention(juryRows[0][0]);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once + auto-refresh every 60s
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (data.length === 0) {
    return <p className="text-center mt-10">Loading results...</p>;
  }

  const top3 = data.slice(0, 3);
  const top10 = data.slice(0, 10);
  const audienceChoice = [...data].sort(
    (a, b) => Number(b[4] || 0) - Number(a[4] || 0)
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🎬 Swara Media Global Portrait Contest 2025
      </h2>

      {/* Refresh Controls */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-sm">
          ⏰ Last updated: {lastUpdated || "—"}
        </p>
        <button
          onClick={fetchAllData}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "🔄 Refresh Now"}
        </button>
      </div>

      {/* Winners Section */}
      <h3 className="text-xl font-semibold text-center mb-4">
        🏆 Top 3 Winners
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {top3.map((row, i) => (
          <div
            key={i}
            className={`rounded-2xl shadow-lg p-6 text-center ${
              i === 0
                ? "bg-[#fff] border-2 border-yellow-500 text-[#000]"
                : i === 1
                ? "bg-gray-200 border-2 border-gray-400 text-[#000]"
                : "bg-orange-200 border-2 border-orange-400 text-[#000]"
            }`}
          >
            {row[5] && (
              <img
                src={row[5]}
                alt={row[1]}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
            )}

            <h4 className="text-lg font-bold">
              {i === 0
                ? "🥇 1st Place"
                : i === 1
                ? "🥈 2nd Place"
                : "🥉 3rd Place"}
            </h4>
            <p className="mt-2 font-semibold">{row[1]}</p>
            <p className="italic text-sm">{row[2]}</p>
            <p className="mt-2 text-lg font-bold">Score: {row[3]}</p>

            {row[4] && (
              <a
                href={row[4]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-600 underline"
              >
                🎥 Watch Video
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Top 10 Finalists */}
      <h3 className="text-xl font-semibold text-center mb-4">
        🏅 Top 10 Finalists
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {top10.map((row, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="font-bold">
                #{i + 1} – {row[1]}
              </p>
              <p className="text-sm italic">{row[2]}</p>
            </div>
            <p className="font-semibold">Score: {row[3]}</p>
          </div>
        ))}
      </div>

      {/* Audience Choice */}
      <h3 className="text-xl font-semibold text-center mb-4">
        🗳️ Audience Choice Award
      </h3>
      {audienceChoice && (
        <div className="bg-green-100 border border-green-400 rounded-xl p-6 text-center shadow-md mb-10 text-[#000]">
          <p className="text-lg font-bold">{audienceChoice[1]}</p>
          <p className="italic">{audienceChoice[2]}</p>
          <p className="mt-2">👍 {audienceChoice[4]} Likes</p>
        </div>
      )}

      {/* Jury Special Mention */}
      <h3 className="text-xl font-semibold text-center mb-4">
        🏅 Jury Special Mention
      </h3>
      <div className="bg-purple-100 border border-purple-400 rounded-xl p-6 text-center shadow-md mb-10 text-[#000]">
        {juryMention ? (
          <>
            <p className="text-lg font-bold">{juryMention}</p>
            <p className="italic">Selected for creativity & originality</p>
          </>
        ) : (
          <p className="italic text-[#000]">Pending jury decision...</p>
        )}
      </div>

      {/* Full Leaderboard */}
      <h3 className="text-xl font-semibold text-center mb-4">
        📊 Full Leaderboard
      </h3>
      <table className="w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-blue-500 text-[#000]">
          <tr>
            <th className="p-3 text-center">Rank</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Video Title</th>
            <th className="p-3 text-center">Final Score</th>
            <th className="p-3 text-center">Likes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`text-center ${
                i === 0
                  ? "bg-yellow-200 font-bold text-[#000]"
                  : i === 1
                  ? "bg-gray-200 font-bold text-[#000]"
                  : i === 2
                  ? "bg-orange-200 font-bold text-[#000]"
                  : "bg-white"
              }`}
            >
              <td className="p-2">{i + 1}</td>
              <td className="p-2 text-left">{row[1]}</td>
              <td className="p-2 text-left">{row[2]}</td>
              <td className="p-2">{row[3]}</td>
              <td className="p-2">{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
