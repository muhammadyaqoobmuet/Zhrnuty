import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className=" flex flex-col items-center justify-center  space-y-4 text-center ">
          <div>
            <h2 className="font-bold sm:text-2xl lg:text-4xl">
              Ready To Save time ?
            </h2>
            <p className="relative leading-relaxed text-lg sm:text-xs lg:text-xl py-2 text-gray-600">
              transform lengthy documents into small insights with with our ai
              powered summarizer
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <Button
            variant={"link"}
            className="  w-full min-[400px]:w-auto bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline text-white font-bold px-8 hover:scale-105 py-6 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out"
          >
            <Link
              className="flex justify-center text-lg font-semibold items-center w-full h-full"
              href="/#pricing"
            >
              Get Started <ArrowRight className="w-6 h-6 animate-pulse  ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
