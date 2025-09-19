// import React, { useEffect, useState } from "react";

// export default function Leaderboard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const sheetId =
//         "1FAIpQLSd6ESqysRFjp2OC0LBbBrLOE2YFoR6ntU3b2Gk54eUyfmsQJw";
//       const sheetName = "Leaderboard"; // Must match your sheet tab name
//       const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

//       const response = await fetch(url);
//       const text = await response.text();

//       // Clean Google Sheets JSONP response
//       const json = JSON.parse(text.substr(47).slice(0, -2));

//       const rows = json.table.rows.map((row) =>
//         row.c.map((cell) => (cell ? cell.v : ""))
//       );

//       setData(rows);
//     };

//     fetchData();
//   }, []);

//   const top3 = data.slice(0, 3); // Top 3 winners

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Title */}
//       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  text-center mb-8 text-blue-600">
//         🎬 Swara Media Global Portrait Contest 2025
//       </h2>

//       {/* Winners Section */}
//       <h3 className="text-xl lg:text-2xl font-semibold text-center mb-4">
//         🏆 Top 3 Winners
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         {top3.map((row, i) => (
//           <div
//             key={i}
//             className={`rounded-2xl shadow-lg p-6 text-center ${
//               i === 0
//                 ? "bg-yellow-200 border-2 border-yellow-500"
//                 : i === 1
//                 ? "bg-gray-200 border-2 border-gray-400"
//                 : "bg-orange-200 border-2 border-orange-400"
//             }`}
//           >
//             {/* Winner Image */}
//             {row[5] && (
//               <img
//                 src={row[5]}
//                 alt={row[1]}
//                 className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
//               />
//             )}

//             <h4 className="text-lg font-bold">
//               {i === 0
//                 ? "🥇 1st Place"
//                 : i === 1
//                 ? "🥈 2nd Place"
//                 : "🥉 3rd Place"}
//             </h4>
//             <p className="mt-2 font-semibold">{row[1]}</p>
//             <p className="italic text-sm">{row[2]}</p>
//             <p className="mt-2 text-lg font-bold">Score: {row[3]}</p>

//             {/* Optional Video Link */}
//             {row[4] && (
//               <a
//                 href={row[4]}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 inline-block text-blue-600 underline"
//               >
//                 🎥 Watch Video
//               </a>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Full Leaderboard */}
//       <h3 className="text-xl font-semibold text-center mb-4">
//         📊 Full Leaderboard
//       </h3>
//       <table className="w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden">
//         <thead className="bg-blue-500 text-white">
//           <tr>
//             <th className="p-3 text-center">Rank</th>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Video Title</th>
//             <th className="p-3 text-center">Final Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr
//               key={i}
//               className={`text-center ${
//                 i === 0
//                   ? "bg-yellow-200 font-bold"
//                   : i === 1
//                   ? "bg-gray-200 font-bold"
//                   : i === 2
//                   ? "bg-orange-200 font-bold"
//                   : "bg-white"
//               }`}
//             >
//               <td className="p-2">{row[0]}</td>
//               <td className="p-2 text-left">{row[1]}</td>
//               <td className="p-2 text-left">{row[2]}</td>
//               <td className="p-2">{row[3]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [juryMention, setJuryMention] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const sheetId = "1M_bNWTAnb-UL-oRgpi6Jps0yVKe0R7F3nByrbRn79GM"; // Replace with your Google Sheet ID
      const sheetName = "Leaderboard";
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

      const response = await fetch(url);
      const text = await response.text();

      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows.map((row) =>
        row.c.map((cell) => (cell ? cell.v : ""))
      );

      setData(rows);
    };

    const fetchJuryMention = async () => {
      const sheetId = "1M_bNWTAnb-UL-oRgpi6Jps0yVKe0R7F3nByrbRn79GM"; // Same Sheet ID
      const sheetName = "Jury Scores"; // Tab name with Jury mention
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

      const response = await fetch(url);
      const text = await response.text();

      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows.map((row) =>
        row.c.map((cell) => (cell ? cell.v : ""))
      );

      // Assume Jury Mention is first row, first column
      if (rows.length > 0 && rows[0][0]) {
        setJuryMention(rows[0][0]);
      }
    };

    fetchLeaderboard();
    fetchJuryMention();
  }, []);

  // if (data.length === 0) {
  //   return <p className="text-center mt-10">Loading results...</p>;
  // }

  const top3 = data.slice(0, 3);
  const top10 = data.slice(0, 10);
  const audienceChoice = [...data].sort(
    (a, b) => Number(b[4] || 0) - Number(a[4] || 0) // Likes in col 4
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🎬 Swara Media Global Portrait Contest 2025
      </h2>

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
                ? "bg-yellow-200 border-2 border-yellow-500"
                : i === 1
                ? "bg-gray-200 border-2 border-gray-400"
                : "bg-orange-200 border-2 border-orange-400"
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
        <div className="bg-green-100 border border-green-400 rounded-xl p-6 text-center shadow-md mb-10">
          <p className="text-lg font-bold">{audienceChoice[1]}</p>
          <p className="italic">{audienceChoice[2]}</p>
          <p className="mt-2">👍 {audienceChoice[4]} Likes</p>
        </div>
      )}

      {/* Jury Special Mention */}
      <h3 className="text-xl font-semibold text-center mb-4">
        🏅 Jury Special Mention
      </h3>
      <div className="bg-purple-100 border border-purple-400 rounded-xl p-6 text-center shadow-md mb-10">
        {juryMention ? (
          <>
            <p className="text-lg font-bold">{juryMention}</p>
            <p className="italic">Selected for creativity & originality</p>
          </>
        ) : (
          <p className="italic text-gray-600">Pending jury decision...</p>
        )}
      </div>

      {/* Full Leaderboard */}
      <h3 className="text-xl font-semibold text-center mb-4">
        📊 Full Leaderboard
      </h3>
      <table className="w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
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
                  ? "bg-yellow-200 font-bold"
                  : i === 1
                  ? "bg-gray-200 font-bold"
                  : i === 2
                  ? "bg-orange-200 font-bold"
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
