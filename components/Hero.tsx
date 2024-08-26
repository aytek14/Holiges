import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Trophy, Users, Clock } from "lucide-react";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const sampleQuestions = [
    "Who won the FIFA World Cup in 2022?",
    "Which player has won the most Ballon d'Or awards?",
    "What is the nickname of Manchester United?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % sampleQuestions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white relative overflow-hidden">
      <div className="relative z-10">
        <header className="py-4 px-4 sm:py-6 sm:px-20 md:px-32 bg-white bg-opacity-10 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/image1.jpg"
                width={40}
                height={40}
                className="rounded-full sm:w-14 sm:h-14"
                alt="Holiges Logo"
              />
              <span className="text-2xl sm:text-4xl font-bold font-nightydemo text-yellow-300">
                Holiges
              </span>
            </div>
            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              {["Home", "About", "Tournaments", "Gallery", "Blogs"].map(
                (item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`}>
                    <span className="text-sm lg:text-base hover:text-yellow-300 transition-colors">
                      {item}
                    </span>
                  </Link>
                )
              )}
            </nav>
            <div className="hidden md:block">
              <Link href="/play">
                <span className="rounded-full bg-yellow-400 px-6 py-2 text-sm lg:text-base font-semibold hover:bg-yellow-500 transition-colors text-purple-700">
                  PLAY NOW
                </span>
              </Link>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ChevronDown
                size={24}
                className={`transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {isMenuOpen && (
            <motion.nav
              className="mt-4 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {["Home", "About", "Tournaments", "Gallery", "Blogs"].map(
                (item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`}>
                    <span className="block py-2 hover:text-yellow-300 transition-colors">
                      {item}
                    </span>
                  </Link>
                )
              )}
              <Link href="/play">
                <span className="block py-2 mt-2 rounded-full bg-yellow-400 text-center font-semibold hover:bg-yellow-500 transition-colors text-purple-700">
                  PLAY NOW
                </span>
              </Link>
            </motion.nav>
          )}
        </header>

        <main className="mx-auto px-4 sm:px-20 md:px-32 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-yellow-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                From Baby Cheers to Hooligan Roars
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg mb-6 sm:mb-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Challenge yourself with Holiges, the ultimate soccer trivia
                game. Climb the ranks from novice to legend!
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/play">
                  <span className="inline-block w-full sm:w-auto text-center rounded-full bg-yellow-400 px-8 py-3 text-base sm:text-lg font-semibold hover:bg-yellow-500 transition-colors text-purple-700">
                    Badge Game
                  </span>
                </Link>
                <Link href="/stadiums">
                  <span className="inline-block w-full sm:w-auto text-center rounded-full border-2 border-yellow-300 px-8 py-3 text-base sm:text-lg font-semibold hover:bg-yellow-300 hover:text-purple-700 transition-colors">
                    Stadium Game
                  </span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="w-full md:w-1/2 mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/imageThree.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Soccer Trivia"
                />
                <div className="absolute inset-0 bg-purple-700 bg-opacity-70 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-yellow-300">
                      Sample Question:
                    </h2>
                    <p className="text-base sm:text-xl italic text-white">
                      {sampleQuestions[currentQuestion]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 sm:mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-yellow-300">
              Why Play Holiges?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Trophy,
                  title: "Climb the Ranks",
                  description:
                    "Start as a Baby Fan and work your way up to Hooligan status!",
                },
                {
                  icon: Users,
                  title: "Compete Globally",
                  description:
                    "Challenge players from around the world and prove your soccer knowledge.",
                },
                {
                  icon: Clock,
                  title: "Daily Challenges",
                  description:
                    "New questions every day to keep you on your toes and expand your knowledge.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <feature.icon
                    className="mx-auto mb-4 sm:mb-6 text-yellow-300"
                    size={48}
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <footer className="mt-16 sm:mt-20 py-4 sm:py-6 bg-purple-700 bg-opacity-50 backdrop-blur-md text-center text-sm sm:text-base">
          <p>&copy; 2024 Holiges. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
