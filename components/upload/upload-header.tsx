import { Sparkles } from "lucide-react";
import React from "react";

const UploadHeader = () => {
  return (
   
      <div className="flex flex-col items-center gap-6 text-center">
        {/* 🔥 AI Badge */}
        <div className="inline-flex items-center rounded-full px-4 py-2 bg-gradient-to-r from-rose-500 via-rose-300 to-rose-700 text-white shadow-lg animate-gradient-x">
          <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide">
            Powered by AI
          </span>
        </div>

        {/* ❤️ Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center gap-2">
          Start Uploading{" "}
          <span className="underline decoration-wavy decoration-rose-500 underline-offset-4">
            Your PDF's
          </span>{" "}
        </h1>

        {/* 💬 Subtext */}
        <p className="text-base sm:text-lg text-gray-600 max-w-xl">
          Upload your PDF and let AI do its magic 🪄✨
        </p>
      </div>
    
  );
};

export default UploadHeader;
