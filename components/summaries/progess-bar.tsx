import { cn } from "@/lib/utils";
import React from "react"; // Keep this if you're unsure of your React version/JSX transform

const ProgressBar = ({
  // Fixed typo: ProgessBar -> ProgressBar
  sections,
  currentSection,
}: {
  // More specific type for sections if possible, otherwise any[] is fine for now
  sections: Array<{ title: string; points: string[] }>; // Or any[], or define the actual type of elements in sections
  currentSection: number;
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-xl pt-4 pb-2 border-b border-rose-50/10">
      {" "}
      {/* Changed z-200 to z-10 (common Tailwind value) and fixed whitespace */}
      <div className="px-4 flex gap-1.5">
        {sections.map((_, index) => {
          return (
            <div
              key={index}
              className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
            >
              <div
                className={cn(
                  " h-full rounded-full transition-all duration-200 bg-linear-to-r from-gray-500 to-rose-600",
                  index === currentSection
                    ? "bg-rose-500 w-full"
                    : currentSection > index
                    ? "w-full opacity-10"
                    : "w-0"
                )}
                key={index + 1}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar; // Fixed typo: ProgessBar -> ProgressBar
