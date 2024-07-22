import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex w-full py-20 px-20 items-center justify-center h-full text-white">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="w-full h-full flex flex-col md:px-100 md:pt-40">
          <div className="h-full w-full flex flex-col ">
            <h1 className="text-4xl font-bold leading-tight md:text-7xl font-nightydemo tracking-wider">
              Holiges: From Baby Cheers to Hooligan Roars
            </h1>
            <p className="mt-4 text-md opacity-60">
              Welcome to Holiges, the ultimate soccer trivia challenge that
              transforms you from a budding Baby Fan to a legendary Hooligan!
              Start your journey in the stands as a newbie, learning the ropes
              and remembering the golden days of soccer. Each correct answer not
              only boosts your knowledge but also elevates your status among
              fans.
            </p>
            <div className="mt-8">
              <a
                href="/test"
                className="inline-block rounded bg-purple-600 px-5 py-3 text-lg font-semibold shadow hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              >
                BADGE GAME!
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center pt-8 md:pt-0">
          <div className="flex w-full h-full items-center justify-center">
            <img
              src="/imageThree.png"
              alt="Gaming Image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
