import BgGradient from "@/components/common/bg-gradient";
import SourceInfo from "@/components/summaries/source-info";
import SummaryHeader from "@/components/summaries/summary-header";

import { getSummariesById } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { MotionDiv } from "@/components/common/moiton-wrapper";
// important for [...summaryId] -> we are catching all routes and they come as a string[]

const Page = async ({ params }: { params: { summaryId: string[] } }) => {
  const firstSegmentWhichIsIdOfWholeUrl = await params.summaryId[0]; // just the first part like "/summary/this-part"

  const summary = await getSummariesById(firstSegmentWhichIsIdOfWholeUrl);
  if (!summary) {
    return notFound();
  }

  const {
    title,
    summary_text: text,
    file_name,
    word_count,
    created_at,
    original_file_url,
  } = summary;

  const timeInTermsOfDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="relative isolate min-h-[90vh] bg-linear-to-b from-rose-50/20 to-white z-100">
      <BgGradient className="bg-gradient-to-br -z-100 from-emerald-600 to-emerald-800" />
      <div className="container mx-auto bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 sm:py-12 lg:py-12">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <SummaryHeader
              date={timeInTermsOfDate}
              word_count={word_count}
              title={title}
            />
          </MotionDiv>
          {file_name && (
            <SourceInfo
              createdAt={created_at}
              summaryText={text}
              title={title}
              originalFileUrl={original_file_url}
              file_name={file_name}
            />
          )}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mt-4 sm:mt-8 lg:mt-16"
          >
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
              <div className="absolute z-100 top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              </div>
              {/* SummaryViewer is commented out based on the last image */}
              <SummaryViewer summary={summary.summary_text} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default Page;
