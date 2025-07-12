import React from "react";

export default function CtaSection() {
  return (
    <section className="bg-[#252525] text-white py-12 w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-8xl h-auto px-16 lg:px-auto leading-tight">
        <div className="max-w-2xl">
          <h2 className="text-center md:text-start text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-professional-song mb-6 h-auto leading-tight font-montserrat">
            AI-Powered Song Production
          </h2>
          <p className="text-gray-300 font-normal text-base md:text-xl lg:text-2xl sm:text-center md:text-start leading-tight font-montserrat">
            Turn your raw vocal into a fully-produced song. Just upload your
            voice, choose a style, and our AI will build the music around it.
            Get closer than ever to the{" "}
            <span className="font-bold text-white">
              fully-produced song you’ve imagined.
            </span>
          </p>
        </div>

        <div className="flex justify-center md:justify-start pl-4 items-center w-full h-full">
          <div className="flex overflow-hidden rounded-xs">
            <div className="p-8 lg:p-12 text-lg lg:text-2xl text-gray-400 font-bold border-4 rounded-l-lg border-[#929292] bg-transparent font-montserrat">
              ORIGINAL
            </div>
            <div className="w-px bg-blue-200"></div>
            <div className="border-gradient-right">
              <div className="p-8 lg:p-12 text-lg lg:text-2xl text-white font-bold bg-[#252525] rounded-r-lg font-montserrat">
                VOCALIZED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
