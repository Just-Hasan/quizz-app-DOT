import { FaTrophy } from "react-icons/fa";

export default function Leaderboard() {
  const highscore = JSON.parse(
    localStorage.getItem("dot_quizz_user_highscore")
  );

  return (
    <ul className="grid  w-[70%] mx-auto gap-4 mt-12">
      {highscore
        .sort((a, b) => b.highscore - a.highscore)
        .map((user, i) => {
          return (
            <li
              key={i}
              className="bg-[#f4f4f4]  text-6xl rounded-xl flex justify-between p-4 text-[#1c2470] w-full "
            >
              <span>
                {i < 3 && user.highscore !== 0 ? (
                  <FaTrophy
                    className={` ${
                      i === 0
                        ? "text-yellow-400"
                        : i === 1
                        ? "text-gray-400"
                        : i === 2
                        ? "text-[#9c5c41]"
                        : ""
                    }`}
                  />
                ) : (
                  `#${i + 1}`
                )}
              </span>
              <span className="w-full pl-8 text-left">{user.username} </span>
              <span>{user.highscore}</span>
            </li>
          );
        })}
    </ul>
  );
}
