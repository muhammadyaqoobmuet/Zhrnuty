"use client";
import React, { useState } from "react";
// Assuming Card components are from a UI library like Shadcn UI
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NavigationControls } from "./navigation-controlls";
import ProgressBar from "./progess-bar";
import ContentSection from "./content-section";
import { MotionDiv } from "../common/moiton-wrapper";

// Helper function to parse individual sections of the summary
const parseSection = (section: string) => {
  // Split the section into title and content by the first newline
  const [titleRaw, ...content] = section.split("\n");
  // const content = contentLines.join("\n").trim(); // Join remaining lines as content

  console.log(content);
  // Clean the title: remove leading '#' if present, then trim whitespace
  const cleanTitle = titleRaw.startsWith("#")
    ? titleRaw.substring(1).trim()
    : titleRaw.trim();

  const points: string[] = [];

  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();

    // If the line starts with a bullet point '•'
    if (trimmedLine.startsWith("•")) {
      // If there's an accumulated point, push it to the array
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      // Start a new point with the current trimmed line
      currentPoint = trimmedLine;
    }
    // If the line is empty
    else if (!trimmedLine) {
      // If there's an accumulated point, push it
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      // Reset current point
      currentPoint = "";
    }
    // Otherwise, append the line to the current point
    else {
      // Add a space before appending if currentPoint is not empty
      currentPoint += (currentPoint ? " " : "") + trimmedLine;
    }
  });

  // After the loop, push any remaining accumulated point
  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  // The return statement is also part of this logic,
  // assuming `cleanTitle` is available in this scope.
  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && // Ensure the point is not an empty string
        !point.startsWith("#") && // Filter out lines starting with '#'
        !point.startsWith("[Choose") // Filter out lines starting with '[Choose'
    ),
  };
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col   gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/60 backdrop-blur-xs z-10 ">
      <h2 className="text-2xl  text-center flex items-center justify-center md:gap-2 font-bold lg:text-4xl">
        {title}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
 ;
  // creating handlers

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const handleSectionSelect = (index: number) =>
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));

  const [currentSection, setCurrentSection] = useState(0);

  // This part processes the summary string into structured sections.
  // It splits by '# ' assuming sections are delineated by a newline, then a hash, then a space.
  const sections = summary
    .split("\n# ") // Split by newline + '# ' to get raw sections
    .map((section) => section.trim()) // Trim whitespace from each section
    .filter(Boolean) // Remove any empty strings resulting from the split
    .map(parseSection); // Parse each section into { title, content }

  
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <MotionDiv
        key={currentSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 sm:pb-24 "
      >
        <div className="sm:px-6 px-4 ">
          <SectionTitle title={sections[currentSection].title || ""} />
          <ContentSection
            points={sections[currentSection].points}
            title={sections[currentSection].title || ""}
          />
        </div>
      </MotionDiv>

      <NavigationControls
        totalSections={sections.length}
        currentSection={currentSection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSectionSelect}
      />
    </Card>
  );
}
