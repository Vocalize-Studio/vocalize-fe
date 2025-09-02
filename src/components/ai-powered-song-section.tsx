import React from "react";

export default function AiPoweredSongSection() {
  return (
    <section className="bg-[#252525] text-white w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] items-center gap-8 lg:gap-10">
        <div className="max-w-[48rem] md:max-w-[34rem] md:justify-self-start justify-self-center">
          <h2
            className="font-bold font-montserrat text-center md:text-left leading-tight text-professional-song
               text-[clamp(2.5rem,5vw,3.5rem)]  /* naikkan min & max */
               sm:text-[clamp(2.5rem,5vw,3.5rem)]"
          >
            AI-Powered Song
            <br className="hidden sm:block" /> Production
          </h2>

          <p
            className="mt-4 md:mt-3 text-center md:text-left text-[#CFCFCF] font-montserrat
               text-[clamp(1rem,2.5vw,1.25rem)] /* naikkan paragraf juga */
               leading-snug"
          >
            Turn your raw vocal into a fully-produced song. Just upload your
            voice, choose a style, and our AI will build the music around it.
            Get closer than ever to the{" "}
            <span className="font-bold text-white">
              fully-produced song you’ve imagined.
            </span>
          </p>
        </div>

        <div className="w-full md:justify-self-start justify-self-center">
          <div className="flex justify-center md:justify-start items-center w-full h-full">
            <div className="flex overflow-hidden rounded-xs">
              <div className="p-4 md:p-8 lg:p-12 text-base md:text-lg lg:text-2xl text-gray-400 font-bold border-4 rounded-l-lg border-[#929292] bg-transparent font-montserrat">
                ORIGINAL
              </div>
              <div className="w-px bg-blue-200"></div>
              <div className="border-gradient-right">
                <div className="p-4 md:p-8 lg:p-12 text-base md:text-lg lg:text-2xl text-white font-bold bg-[#252525] rounded-r-lg font-montserrat">
                  VOCALIZED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
