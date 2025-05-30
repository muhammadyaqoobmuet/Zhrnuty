import React from "react";
import { FileText, Plus, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const NoSummariesState = () => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 relative overflow-hidden">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 text-center relative min-h-[400px] flex flex-col justify-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-rose-400/20 to-rose-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-rose-400/20 to-rose-400/40 rounded-full blur-2xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Main Icon */}
        <div className="hidden md:block relative mx-auto mb-4 sm:mb-6 md:mb-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-cyan-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative bg-gradient-to-r from-rose-500 to-rose-800 rounded-full p-3 sm:p-4 md:p-6 shadow-lg">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-rose-500 to-rose-700 rounded-full p-1 sm:p-1.5">
              <Sparkles
                className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-spin"
                style={{ animationDuration: "4s" }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl  bg-gradient-to-r from-rose-700 via-rsoe-600 to-rose-800 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 px-2 font-bold">
          No Summaries Yet
        </h2>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-sm sm:max-w-lg md:max-w-2xl mx-auto leading-6 px-4">
          Transform your PDFs into concise, actionable insights. Upload your
          first document to get started on your journey of intelligent
          summarization.
        </p>

        {/* CTA Button */}
        <Link href="/upload">
          <button className="  group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-700 hover:to-rose-500 text-white font-semibold px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
            <span className="relative z-10 hidden sm:inline">New Summary</span>
            <span className="relative z-10 sm:hidden">Upload PDF</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoSummariesState;
