import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section className="py-20 bg-white space-y-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#252525] mb-12 font-montserrat">
            Our Simple Plan, Three Ways to Pay
          </h2>
          <p className="text-2xl md:text-3xl text-[#252525] mb-4 font-normal font-montserrat opacity-90">
            Offering unlimited vocalize and unlimited downloads
          </p>
          <p className="text-2xl md:text-3xl text-[#252525] max-w-5xl mx-auto text-center font-normal font-montserrat opacity-90">
            If you are unhappy for any reason within 14 days of purchase and
            less than 4 downloads, we'll refund your money back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4">
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full">
            <div className="h-10 bg-blue-500 w-full rounded-t-3xl"></div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6 font-montserrat">
                  Yearly (Billed Monthly)
                </div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2 font-montserrat">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1 font-montserrat">
                    19
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50 ml-2 font-montserrat">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80 font-montserrat">
                  1-Year commitment
                </p>
              </div>
              <button className="px-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold cursor-pointer font-montserrat">
                GET STARTED
              </button>
            </div>
          </div>
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full transform scale-105">
            <div className="h-12 bg-gradient-to-b from-[#3B82F6] to-[#00025E] w-full text-center uppercase tracking-wide flex items-center justify-center text-xl font-bold font-montserrat text-white rounded-t-3xl">
              Most Popular
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6 font-montserrat">
                  Yearly
                </div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2 font-montserrat">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1 font-montserrat mt-2">
                    13
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50 font-montserrat">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80 font-montserrat">
                  $156 billed upfront
                </p>
              </div>
              <button className="px-4 w-full bg-gradient-to-b from-[#3B82F6] to-[#234C90] hover:from-[#5A94F9] hover:to-[#2B5EB0] text-white py-3 rounded-2xl font-semibold font-montserrat cursor-pointer">
                GET STARTED
              </button>
            </div>
          </div>
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full">
            <div className="h-10 bg-[#234c90] w-full rounded-t-3xl"></div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6 font-montserrat">
                  Monthly (Billed Monthly)
                </div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2 font-montserrat">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1 font-montserrat">
                    39
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50 font-montserrat">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80 font-montserrat">
                  Cancel anytime
                </p>
              </div>
              <button className="px-4 w-full bg-[#1B3A6F] hover:bg-[#1B3A5F] text-white py-3 rounded-2xl font-semibold cursor-pointer font-montserrat">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-20">
          <div className="mx-auto flex items-center justify-center">
            <div className="bg-gradient-to-b from-[#3B82F6] to-[#1B3A6F] rounded-lg p-8 md:p-12 text-center text-white cta-card-shadow">
              <h2 className="text-3xl md:text-5xl font-bold mb-10 font-montserrat">
                Experience AI Vocalizer for yourself
              </h2>

              <p className="text-xl lg:text-2xl mb-2 opacity-90 max-w-4xl mx-auto text-center font-normal font-montserrat leading-normal">
                Master and preview unlimited tracks for free and{" "}
                <span className="font-bold">
                  only pay when you're ready to download.
                </span>{" "}
                Get started today!
              </p>

              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 px-12 py-8 font-montserrat rounded-full font-semibold text-xl md:text-3xl cursor-pointer mt-4 uppercase max-w-5xl mx-auto btn-custom-shadow"
              >
                <span className="bg-gradient-to-r from-blue-500 to-[#00025E] bg-clip-text text-transparent">
                  SIGN UP FREE
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
