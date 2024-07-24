import React, { useEffect, useState } from "react";
import { BadgeItem } from "@/const/type";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const Play = () => {
  const router = useRouter();
  const [badgeList, setBadgeList] = useState<BadgeItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [rightAnswer, setRightAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [userScore, setUserScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [fanLevel, setFanLevel] = useState({
    title: "Baby Fan",
    description: "Remember the first days you came to the stadium",
    level: 1,
  });
  const maxPoints = 13250;
  const [feedbackLabel, setFeedbackLabel] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(`/api/badges`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setBadgeList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBadges();
  }, []);

  useEffect(() => {
    updateFanLevel(); // Call this function whenever the score updates
  }, [userScore]);

  useEffect(() => {
    if (badgeList.length > 0) {
      let organizedQuestions = [];
      for (let level = 1; level <= 5; level++) {
        const filteredLevelBadges = badgeList.filter(
          (badge) => badge.level === level
        );
        const questions = filteredLevelBadges
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((badge) => {
            const wrongAnswers = badgeList
              .filter(
                (item) => item.title !== badge.title && item.level === level
              )
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((item) => item.title);

            return {
              imageUrl: badge.imageUrl,
              question: "Which football team does the logo you see belong to?",
              answers: [badge.title, ...wrongAnswers].sort(
                () => 0.5 - Math.random()
              ),
              correctAnswer: badge.title,
              level: badge.level,
            };
          });
        organizedQuestions.push(...questions);
      }
      setShuffledQuestions(organizedQuestions);
    }
  }, [badgeList]);

  useEffect(() => {
    if (timeLeft > 0 && selectedAnswer === null) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      setSelectedAnswer("timeout");
      setRightAnswer(shuffledQuestions[currentQuestion].correctAnswer);
    }
  }, [timeLeft, selectedAnswer, shuffledQuestions, currentQuestion]);

  const pointValues = {
    1: 150,
    2: 250,
    3: 500,
    4: 750,
    5: 1000,
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setRightAnswer(shuffledQuestions[currentQuestion].correctAnswer);
    const currentLevel = shuffledQuestions[currentQuestion]
      .level as keyof typeof pointValues;

    if (
      answer === shuffledQuestions[currentQuestion].correctAnswer &&
      pointValues[currentLevel] !== undefined
    ) {
      const pointsEarned = pointValues[currentLevel];
      setUserScore(userScore + pointsEarned);
      setCorrectAnswers(correctAnswers + 1);
      setFeedbackLabel("CORRECT!");
    } else {
      setFeedbackLabel("WRONG!");
    }

    setTimeout(() => {
      setFeedbackLabel(null);
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setSelectedAnswer(null);
      setRightAnswer(null);
      setTimeLeft(10);
      setCurrentQuestion((prev) => prev + 1);
      setFeedbackLabel(null);
    } else {
      setShowResults(true);
    }
  };

  const updateFanLevel = () => {
    const levels = [
      {
        min: 0,
        max: 750,
        title: "Baby Fan",
        description: "Remember the first days you came to the stadium",
        level: 1,
      },
      {
        min: 751,
        max: 1800,
        title: "Teenage Fan",
        description: "The first match you went to with your friends.",
        level: 2,
      },
      {
        min: 1801,
        max: 4200,
        title: "Loyal Fan",
        description: "Loyal fan with combined ticket.",
        level: 3,
      },
      {
        min: 4201,
        max: 9000,
        title: "Fanatic Fan",
        description: "The sought-after name of the stands.",
        level: 4,
      },
      {
        min: 9001,
        max: 13250,
        title: "Hooligan Fan",
        description: "There are men in the stands who would die for you.",
        level: 5,
      },
    ];
    const currentLevel = levels.find(
      (level) => userScore >= level.min && userScore <= level.max
    );
    if (currentLevel) {
      setFanLevel({
        title: currentLevel.title,
        description: currentLevel.description,
        level: currentLevel.level,
      });
    }
  };

  if (shuffledQuestions.length === 0) {
    return <Loading />;
  }

  const { imageUrl, question, answers, correctAnswer, level } =
    shuffledQuestions[currentQuestion];

  const progressBarWidth = `${(userScore / maxPoints) * 100}%`;

  const handleRetry = () => {
    // Reset all states to initial values
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setRightAnswer(null);
    setTimeLeft(10);
    setUserScore(0);
    setCorrectAnswers(0);
    setFeedbackLabel(null);
    setShowResults(false);
    // Re-shuffle questions
    setShuffledQuestions(
      [...shuffledQuestions].sort(() => 0.5 - Math.random())
    );
  };

  const handleClose = () => {
    router.push("/"); // Navigate to home page
  };

  if (showResults) {
    const percentage = Math.round(
      (correctAnswers / shuffledQuestions.length) * 100
    );
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-purple-900 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-800 mb-6">
            You scored {correctAnswers}/{shuffledQuestions.length} ({percentage}
            %)
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out"
              onClick={handleRetry}
            >
              Retry
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out"
              onClick={handleClose}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-blue-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-lg md:text-3xl font-bold text-white mb-2">
            {fanLevel.title}
          </h1>
          <p className="text-sm italic text-white opacity-60">
            "{fanLevel.description}"
          </p>
          <div className="flex w-full items-center justify-center mt-4  gap-4">
            <motion.img
              src={`/level${fanLevel.level}.png`}
              alt="level"
              className="w-20 h-16 md:w-24 md:h-24 mx-auto my-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <div className="flex flex-col w-full text-start">
              <p className="text-2xl font-bold text-white">
                {userScore} Points
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: progressBarWidth }}
                  initial={{ width: 0 }}
                  animate={{ width: progressBarWidth }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <AnimatePresence>
            {feedbackLabel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{ duration: 0.5 }}
                className={`absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 
                            ${
                              feedbackLabel === "CORRECT!"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } 
                            text-white text-2xl font-bold py-2 px-4 rounded-full 
                            shadow-lg border-4 border-white`}
              >
                {feedbackLabel}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center mb-6">
            <img
              src={imageUrl}
              alt="Badge"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">{question}</h2>
          <div className="space-y-3">
            {answers.map((answer: string, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`w-full py-3 px-4 rounded-lg text-left transition duration-200 ease-in-out ${
                  selectedAnswer
                    ? answer === rightAnswer
                      ? "bg-green-500 text-white"
                      : answer === selectedAnswer
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-800"
                    : "bg-gray-100 text-gray-800 hover:bg-purple-100"
                }`}
                disabled={selectedAnswer !== null}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {answer}
              </motion.button>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6 w-full">
            <AnimatePresence mode="wait">
              {timeLeft > 0 && !selectedAnswer ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl font-bold text-red-600"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {timeLeft}s
                  </motion.div>
                </motion.div>
              ) : (
                <motion.button
                  key="next-button"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: "auto",
                    height: "auto",
                    borderRadius: "0.5rem",
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleNextQuestion}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out"
                >
                  Next
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Play;
