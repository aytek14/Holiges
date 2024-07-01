import React from "react";
import dynamic from 'next/dynamic';
import loadingAnimation from "@/public/loadingAnimation.json";

// Dynamically import the Lottie component without server-side rendering
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-purple-500">
      <div className="w-[320px] h-[320px]">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <div className="text-xl font-bold text-white uppercase">Creating your game...</div>
    </div>
  );
};

export default Loading;
