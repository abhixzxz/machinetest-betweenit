import React from "react";
import { FlipHorizontal2 } from "lucide-react"; 

const Loader = ({ progress }) => {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-black">
      <div className="relative flex items-center justify-center">
        <FlipHorizontal2 className="animate-spin text-white w-16 h-16" />
      </div>
      {/* <div className="flex items-center justify-center absolute w-full h-full">
        <span className="text-xl font-bold text-white">{progress}%</span>
      </div> */}
      
    </div>
  );
};

export default Loader;
