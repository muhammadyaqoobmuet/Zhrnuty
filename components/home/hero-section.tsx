import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12  max-w-7xl  ">
      <div className="flex items-center">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-400 via-rose-500 to-rose-800 text-white animate-gradient-x">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 blur-[10px] animate-pulse"></div> */}

          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 font-medium bg-white rounded-full group-hover:bg-gray-500 transition-colors  duration-300"
          >
            <Sparkles className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
            <p className=" text-base text-rose-700">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="text-center font-bold py-6 ">
        Transform PDFs into{" "}
        <span className="relative inline-block ">
          <span className="relative z-10  px-2 ">concise</span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-rose-200/50  -rotate-2 rounded-lg transform -skew-y-1"
          ></span>
        </span>{" "}
        summaries
      </h1>
      <h4 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        get a beautiful summary reel in seconds
      </h4>
      
        <Button
          className="text-white  mt-6 text-base sm:text-lg lg:text-xl rounded-full  px-8 sm:px-10 py-6 sm:py-7 lg:py-8

          bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 focus-visible:outline-none hover:no-underline shadow-lg transition-colors duration-300 ease-in-out font-bold"
          size="lg"
          variant={"link"}
        >
          <Link className="gap-2 items-center flex " href="/#pricing">
            <span>Try Zhrnuty</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </Link>
        </Button>
      
    </section>
  );
};

export default HeroSection;
