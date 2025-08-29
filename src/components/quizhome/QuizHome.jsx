import React, { useState } from 'react'
import QuestionOption from '../option/QuestionOption';
import Timer from '../Timer';

const QuizHome = () => {
    const [mcqs, setMcqs] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const QUIZ_TIME = 600;

    const fetchdata = async () => {
        if (!category || !difficulty) {
            alert("⚠️ Please select a category first!");
            return;
        }
        try {
            let url = `https://the-trivia-api.com/v2/questions?limit=15&categories=${category}&difficulties=${difficulty}`;
            let res = await fetch(url);
            let data = await res.json();
            setMcqs(data);
            setQuizStarted(true);
            setScore(0);
            setCurrentQuestionIndex(0);
            setShowResult(false);
        } catch (err) {
            console.log("Error:", err.message);
        }
    };

    const handleNext = () => {
        if (answer === mcqs[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
        setAnswer("");

        if (currentQuestionIndex < mcqs.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    function handleAnswer(answer) {
        setAnswer(answer);
    }

    return (
        <div className="min-h-screen flex items-center justify-center h-[90vh] bg-gradient-to-r from-indigo-500   via-purple-500 to-pink-500 p-6 sm:p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg sm:max-w-2xl p-4 sm:p-8 ">
                <h1 className="text-2xl sm:text-4xl font-bold text-center text-indigo-600 mb-4">
                    ⚡ Quiz App
                </h1>

                {/* Timer */}
                {quizStarted && !showResult && (
                    <Timer
                        quizStarted={quizStarted}
                        showResult={showResult}
                        onTimeUp={() => setShowResult(true)}
                    />
                )}

                {/* Start Section */}
                {!quizStarted && !showResult && (
                    <div className="text-center space-y-4">
                        <div className="flex flex-col items-center gap-3 mb-6 w-full">
                            <label className="text-lg sm:text-xl font-semibold text-indigo-600">
                                🎯 Select Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full max-w-xs sm:max-w-sm p-2 sm:p-3 rounded-xl border-2 border-indigo-400 bg-white text-gray-800 font-medium text-base sm:text-lg shadow-md 
            focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            >
                                <option value="">Choose a Category</option>
                                <option value="science">🔬 Science</option>
                                <option value="history">📜 History</option>
                                <option value="geography">🌍 Geography</option>
                                <option value="sports">⚽ Sports</option>
                                <option value="music">🎵 Music</option>
                            </select>
                        </div>

                        <div className="flex flex-col items-center gap-3 mb-6 w-full">
                            <label className="text-lg sm:text-xl font-semibold text-indigo-600">
                                🎯 Select Difficulty
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full max-w-xs sm:max-w-sm p-2 sm:p-3 rounded-xl border-2 border-indigo-400 bg-white text-gray-800 font-medium text-base sm:text-lg shadow-md 
                focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            >
                                <option value="">Choose Difficulty</option>
                                <option value="easy">🟢 Easy</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="hard">🔴 Hard</option>
                            </select>
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base">
                            ⏱ Total Time: {QUIZ_TIME / 60} minutes
                        </p>

                        <button
                            onClick={fetchdata}
                            className="w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg text-base sm:text-lg font-medium hover:bg-indigo-700 transition"
                        >
                            🚀 Start Quiz
                        </button>
                    </div>
                )}

                {/* Quiz Questions */}
                {quizStarted && !showResult && mcqs.length > 0 && (
                    <>
                        <div className="mb-6">
                            <h2 className="text-base sm:text-lg font-semibold mb-2">
                                Question {currentQuestionIndex + 1} of {mcqs.length}
                            </h2>
                            <p className="text-lg sm:text-xl font-medium text-gray-800">
                                {mcqs[currentQuestionIndex].question.text}
                            </p>
                        </div>

                        <QuestionOption
                            onAnswer={handleAnswer}
                            answer={answer}
                            correctAnswer={mcqs[currentQuestionIndex].correctAnswer}
                            incorrectAnswers={mcqs[currentQuestionIndex].incorrectAnswers}
                        />

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                disabled={!answer}
                                onClick={handleNext}
                                className={`w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-medium transition ${answer
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {currentQuestionIndex < mcqs.length - 1 ? "Next ➡️" : "Finish ✅"}
                            </button>
                        </div>
                    </>
                )}

                {/* Result Section */}
                {showResult && (
                    <div className="text-center">
                        <h2 className="text-xl sm:text-3xl font-bold text-green-600 mb-4">
                            🎉 Quiz Finished!
                        </h2>
                        <p className="text-base sm:text-xl mb-6">
                            Your Score: <span className="font-bold">{score}</span> / {mcqs.length}
                        </p>
                        {/* ✅ Percentage */}
                        <p className="text-base sm:text-xl mb-4">
                            Percentage: <span className="font-bold">{((score / mcqs.length) * 100).toFixed(2)}%</span>
                        </p>

                        {/* Pass / Fail Condition */}
                        {((score / mcqs.length) * 100) >= 40 ? (
                            <div className="text-center">
                                <p className="text-lg font-bold text-green-600 mb-4">
                                    ✅ Congratulations! You Passed
                                </p>
                                <img
                                    src="https://media.giphy.com/media/6i2vpRwirjwjwpCSmx/giphy.gif"
                                    alt="Passed"
                                    className="mx-auto block max-w-36 sm:max-w-48 md:max-w-60 h-auto rounded-lg mb-4"
                                />
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-lg font-bold text-red-600 mb-4">
                                    ❌ Sorry! You Failed
                                </p>
                                <img
                                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3MxcTNueTU5azZyaHZkaHE5YTFmcWtzYm01dzdzMG80YWh4NTJkZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d2lcHJTG5Tscg/giphy.gif"
                                    alt="Failed"
                                    className="mx-auto block max-w-36 sm:max-w-30 md:max-w-60 h-auto rounded-lg mb-4"
                                />
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setQuizStarted(false);
                                setCategory("");
                                setDifficulty("");
                                setMcqs([]);
                                setScore(0);
                                setCurrentQuestionIndex(0);
                                setAnswer("");
                                setShowResult(false);

                            }}
                            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg text-base sm:text-lg font-medium hover:bg-indigo-700 transition"
                        >
                            🔄 Restart Quiz
                        </button>

                    </div>
                )}
            </div>
        </div>

    )
}

export default QuizHome;
