import React, { useEffect, useState } from "react";

const Timer = ({ quizStarted, showResult, onTimeUp }) => {
  const totalTime = 600;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (quizStarted && !showResult) {
      setTimeLeft(totalTime);
    }
  }, [quizStarted, showResult]);

  useEffect(() => {
    let timer;
    if (quizStarted && !showResult) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, showResult, onTimeUp]);


  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };


  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="w-full max-w-xs sm:max-w-lg mx-auto my-6">
      <div className="text-center font-semibold mb-2 text-sm sm:text-base">
        ⏳ Time Left:{" "}
        <span
          className={`${timeLeft <= 60 ? "text-red-500 animate-pulse" : "text-indigo-600"
            }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 60 ? "bg-red-500" : "bg-indigo-600"
            }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>

  );
};

export default Timer;
