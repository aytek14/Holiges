import React, { useEffect, useState } from "react";
import { BadgeItem } from "@/const/type";
import Loading from "@/components/Loading";

const Test = () => {
  const [badgeList, setBadgeList] = useState<BadgeItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [rightAnswer, setRightAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [userScore, setUserScore] = useState(0);
  const [fanLevel, setFanLevel] = useState({
    title: "Baby Fan",
    description: "Remember the first days you came to the stadium",
    level: 1,
  });
  const maxPoints = 13250; // Maximum points possible

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
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setRightAnswer(null);
    setTimeLeft(10);
    setCurrentQuestion((prev) => prev + 1);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-900 text-white">
      <div className="flex w-2/3 h-full bg-white rounded-lg shadow-lg ">
        <div className="text-black p-6 w-full max-w-lg flex flex-col items-center justify-center">
          <div className="text-4xl font-nightydemo text-purple-900">
            {fanLevel.title}
          </div>
          <div className="text-md font-inter italic pb-4">{`"${fanLevel.description}"`}</div>
          <img
            src={`/level${fanLevel.level}.png`}
            alt="level"
            className="w-48 h-48 rounded-xl object-contain"
          />
          <div className="text-xl font-bold pt-4 text-purple-900">{`${userScore} Points`}</div>
          <div className="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
        </div>
        <div className=" text-black p-6  w-full">
          <div className="flex items-center justify-center p-10">
            <img
              src={imageUrl}
              alt="Badge"
              className="w-28 h-28 object-contain"
            />
          </div>
          <div className="mb-4 text-lg font-bold">{question}</div>
          <div className="space-y-4">
            {answers.map((answer: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`block w-full py-2 px-4 rounded focus:outline-none focus:ring-2 ${
                  selectedAnswer
                    ? answer === rightAnswer
                      ? "bg-green-500 text-white"
                      : answer === selectedAnswer ||
                        selectedAnswer === "timeout"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="w-12 h-12 text-2xl font-bold text-center items-center justify-center text-red-600  p-4">
              {timeLeft}s
            </div>
          </div>
          {selectedAnswer && (
            <div className="mt-4 text-right">
              <button
                onClick={handleNextQuestion}
                className="inline-block rounded bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
