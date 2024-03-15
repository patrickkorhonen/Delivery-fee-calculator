import React from "react";
import Calculator from "./components/calculator";

function App() {
  return (
    <div className="bg-[#00c2e8] min-h-screen grid xl:grid-cols-2">
      <div className="flex flex-col sm:my-10 drop-shadow-xl mx-auto justify-center text-white text-4xl md:text-7xl xl:text-8xl 2xl:text-9xl font-inter font-bold">
        <p>Calculate</p>
        <p>delivery</p>
        <p>fee.</p>
      </div>
      <div className="flex justify-center h-max sm:h-auto mx-2 xl:mx-20 2xl:mx-28 items-center">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
