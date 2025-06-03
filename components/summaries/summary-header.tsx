import {
  Calendar,
  Sparkle,
  ChevronLeft,
  Sparkles,
  TimerIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming your Shadcn UI Button component is here
import Link from "next/link";
import { Badge } from "../ui/badge";

const SummaryHeader = ({
  title,
  date,
  word_count,
  onBack, // Optional function for the back button
}: {
  title: string;
  date: string;
  word_count: string;

  onBack?: () => void;
}) => {
  const readTime: number = Math.ceil(Number(word_count || 0) / 200);
  return (
    <div className="flex gap-4 mb-4 justify-between">
      {/* This empty div likely holds other content that would be left-aligned,
              with the button being right-aligned due to justify-between.
              If there's no other content, you might consider removing justify-between
              or placing it directly in a parent container for the button. */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          {" "}
          {/* This outer div has an empty className in the image */}
          <Badge
            variant="secondary" // As specified in the image
            className="relative px-4 py-1.5 text-sm font-medium 
                     bg-white/80 backdrop-blur-xs rounded-full 
                     hover:bg-white/90 transition-all duration-200 
                     shadow-xs hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500" />
            AI Summary
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground text-sm bg-white rounded-2xl ">
            <Calendar className="h-4 w-4 text-rose-400" />
            {date}
          </div>
          <div className="flex items-center text-muted-foreground text-sm gap-2 ">
            <TimerIcon className="h-4 w-4 text-rose-400" />
            {readTime} min read
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <div className="self-start ">
        <Link href="/dashboard" passHref>
          <Button
            variant="link"
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 
                           hover:bg-white/80 backdrop-blur-xs rounded-full 
                           transition-all duration-200 shadow-xs hover:shadow-md 
                           border border-rose-100 bg-rose-100 px-2 sm:px-3"
          >
            <ChevronLeft
              className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 
                             transition-transform group-hover:-translate-x-0.5"
            />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Back <span className="hidden sm:inline">to</span> Dashboard
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryHeader;
