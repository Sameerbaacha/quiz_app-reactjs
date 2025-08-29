import React, { useEffect, useState } from "react";

const QuestionOption = ({ correctAnswer, incorrectAnswers, onAnswer, answer }) => {
  const [allOptions, setAllOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false); // ✅ disable state

  useEffect(() => {
    const shuffled = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    setAllOptions(shuffled);
    setIsDisabled(false); // ✅ new question aate hi dobara enable
  }, [correctAnswer, incorrectAnswers]);

  const handleOption = (value) => {
    if (!isDisabled) {
      onAnswer(value);
      setIsDisabled(true); // ✅ ek baar select hone ke baad lock
    }
  };

  return (
    <div className="mt-2">
      <ul className="space-y-2">
        {allOptions.map((opt, i) => {
          let optionStyle = "bg-white border-gray-300 hover:bg-gray-50";

          if (answer === opt) {
            optionStyle =
              opt === correctAnswer
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500";
          }

          return (
            <li key={i} className="w-full">
              <label
                className={`block w-full p-3 sm:p-4 border rounded-xl cursor-pointer text-sm sm:text-base font-medium transition 
            ${isDisabled && answer !== opt ? "opacity-50 cursor-not-allowed" : ""} 
            ${optionStyle}`}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={answer === opt}
                  onChange={() => handleOption(opt)}
                  disabled={isDisabled}
                  className="hidden"
                />
                <span className="text-gray-800">{opt}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionOption;
