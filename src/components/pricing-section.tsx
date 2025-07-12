import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section className="py-20 bg-white space-y-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-[#252525] mb-12">
            Our Simple Plan, Three Ways to Pay
          </h2>
          <p className="text-3xl text-[#252525] mb-4 font-normal">
            Offering unlimited vocalize and unlimited downloads
          </p>
          <p className="text-3xl text-[#252525] max-w-4xl mx-auto text-center font-normal">
            If you are unhappy for any reason within 14 days of purchase and
            less than 4 downloads, we'll refund your money back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4">
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full">
            <div className="h-6 bg-blue-500 w-full rounded-t-3xl"></div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6">
                  Yearly (Billed Monthly)
                </div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1">
                    19
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50 ml-2">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80">
                  1-Year commitment
                </p>
              </div>
              <button className="px-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-medium cursor-pointer">
                GET STARTED
              </button>
            </div>
          </div>
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full transform scale-105">
            <div className="h-12 bg-gradient-to-b from-[#3B82F6] to-[#00025E] w-full text-center uppercase tracking-wide flex items-center justify-center text-xl font-bold text-white rounded-t-3xl">
              Most Popular
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6">Yearly</div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1">
                    13
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80">
                  $156 billed upfront
                </p>
              </div>
              <button className="px-4 w-full bg-gradient-to-b from-[#3B82F6] to-[#234C90] hover:from-[#5A94F9] hover:to-[#2B5EB0] text-white py-3 rounded-2xl font-medium cursor-pointer">
                GET STARTED
              </button>
            </div>
          </div>
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col h-full">
            <div className="h-6 bg-[#234c90] w-full rounded-t-3xl"></div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <div className="text-2xl font-semibold mb-6">
                  Monthly (Billed Monthly)
                </div>
                <div className="mb-4 flex justify-center items-end">
                  <span className="text-4xl text-[#252525] -translate-y-1/2">
                    $
                  </span>
                  <span className="text-8xl font-bold text-[#252525] ml-1">
                    39
                  </span>
                  <span className="text-gray-500 text-2xl font-normal opacity-50">
                    / mo
                  </span>
                </div>
                <p className="text-lg text-[#252525] mb-8 opacity-80">
                  Cancel anytime
                </p>
              </div>
              <button className="px-4 w-full bg-[#1B3A6F] hover:bg-[#1B3A5F] text-white py-3 rounded-2xl font-medium cursor-pointer">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-20">
          <div className="mx-auto flex items-center justify-center">
            <div className="bg-gradient-to-b from-[#3B82F6] to-[#1B3A6F] rounded-lg p-8 md:p-12 text-center text-white cta-card-shadow">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Experience AI Vocalizer for yourself
              </h2>

              <p className="text-2xl mb-2 opacity-90 max-w-3xl mx-auto text-center">
                Master and preview unlimited tracks for free and{" "}
                <span className="font-semibold">
                  only pay when you're ready to download.
                </span>{" "}
                Get started today!
              </p>

              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 rounded-full font-bold text-lg cursor-pointer mt-4 uppercase"
              >
                sign up free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
