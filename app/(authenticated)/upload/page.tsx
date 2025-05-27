import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { Heart, Sparkles } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          {/* Upload Form */}
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default Page;
