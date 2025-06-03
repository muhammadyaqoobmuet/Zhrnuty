import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import NoSummariesState from "@/components/summaries/no-summaries";
import { MotionDiv } from "@/components/common/moiton-wrapper";

const page = async () => {
  const user = await currentUser();


  if (!user?.id) {
    return redirect("/sign-in");
  }

  const summaries = await getSummaries(user.id);
  console.log(summaries);
  return (
    <main className="min-h-screen">
      <BgGradient className="bg-gradient-to-br from-emerald-700 via-teal-400  to-cyan-700 animate-gradient-x" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col gap-4"
      >
        <div className="px-2 py-12 sm:py-24">
          <div className="flex justify-between items-center gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl tracking-tight font-bold bg-clip-text bg-linear-to-r from bg-rose-500 to-rose-700 text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600 ">
                Transform your pdf into consice , actionable insights
              </p>
            </div>

            <Button
              className="bg-linear-to-r from-rose-500 to-700 hover:from-rose-700 to-rose-500 transition-colors duration-200 group hover:no-underline hover:scale-105"
              variant={"link"}
            >
              <Link
                href={"/upload"}
                className="flex text-white items-center gap-2 "
              >
                <Plus className="w-5 h-6 " />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-100 border-rose-200  rounded-lg p-4 text-rose-800">
              <p>
                Response May be slow becuase of Basic Plan.{" "}
                <Link
                  className="underline underline-offset-4 inline-flex items-center"
                  href="/#pricing"
                >
                  Upgrade To Pro In Future When Available{" "}
                  <ArrowRight className="w-4 h-4 items-center inline-block" />{" "}
                </Link>{" "}
                for unlimited uploads
              </p>
            </div>
          </div>

          {/* grid goes here */}

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0 ">
            {summaries?.length === 0 ? (
              <NoSummariesState />
            ) : (
              summaries?.map((sum, index) => (
                <SummaryCard key={index} summary={sum} />
              ))
            )}
          </div>
        </div>
      </MotionDiv>
    </main>
  );
};

export default page;
