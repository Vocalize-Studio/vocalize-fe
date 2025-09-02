import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/sessions";
import { CtaSection } from "./cta-section";

export async function PricingSection() {
  const user = await getSessionUser();
  const isLoggedIn = !!user;
  return (
    <section className="py-20 relative bg-white space-y-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-pricing-section mb-12 font-montserrat">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] [grid-template-columns:repeat(auto-fit,minmax(310px,1fr))] gap-10 p-2 mx-auto">
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col min-h-[3.25rem]">
            <div className="h-10 bg-blue-500 w-full rounded-t-3xl" />
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
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col min-h-[3.25rem] transform scale-105">
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
                  <span className="text-8xl font-bold text-[#252525] ml-1 font-montserrat">
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
          <div className="border-2 rounded-3xl border-gray-200 bg-white shadow-sm flex flex-col min-h-[3.25rem]">
            <div className="h-10 bg-[#3B82F6] w-full rounded-t-3xl" />
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
              <button className="px-4 w-full  bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold cursor-pointer font-montserrat">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <CtaSection isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </section>
  );
}
