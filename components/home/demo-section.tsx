import React from "react";
import BgGradient from "../common/bg-gradient";
import { Pizza } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="right-0 inset-1" />
        <div className="flex flex-col items-center text-center ">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/70 backdrop-blur-xs border border-gray-500/30 ">
            <Pizza className="w-6 h-6 text-rose-600" />
          </div>
          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how{" "}
              <span className="font-medium text-rose-600">Zhrnuty</span> turns
              your{" "}
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent font-medium">
                PDF into easy summaries
              </span>
              .
            </h3>
          </div>
          {/* add next */}
          <div className="flex justify-center items-center px-2 sm:px4  lg:px-6">
            {/* add summary veiw here a toggler like testinonimal */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
