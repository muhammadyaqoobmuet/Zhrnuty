"use client";
import React, { useCallback, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { processUploadedPdf } from "@/actions/upload-actions";

import { useRouter } from "next/navigation";
//validation schema
const fileScheme = z.object({
  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.size <= 8 * 1024 * 1024, {
      message: "File must be smaller than 8MB",
    })
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
      {
        message: "Only PDF files are allowed",
      }
    ),
});

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
     
      setUploadProgress(100);
      toast.success("File uploaded! Processing summary...", {
        duration: 3000,
      });
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      setIsLoading(false);
    },

    onUploadBegin: (name) => {
      setUploadProgress(0);
      toast.info(`Processing ${name}...`, {
        duration: 2000,
        icon: <Sparkles className="h-4 w-4" />,
      });
    },
    onUploadProgress: setUploadProgress,
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (isLoading) return; // Prevent duplicate submissions

      // Here you would typically handle the file upload logic,
      // get form data
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const file = formData.get("file") as File;

      

      // validate the file type
      const validationResult = fileScheme.safeParse({ file });
      if (!validationResult.success) {
        const errorMessage =
          validationResult.error.flatten().fieldErrors.file?.[0] ||
          "Invalid file";
        toast.error(errorMessage);
        return;
      }

      
      // start upload && SET: IS LOADING TRUE
      setIsLoading(true);
      try {
        // SINGLE UPLOAD CALL
        const uploadResult: any = await startUpload([file]);

        if (!uploadResult?.[0]?.serverData) {
          throw new Error("Upload failed - no server response");
        }

        const result = await processUploadedPdf({
          uploadData: uploadResult[0].serverData,
          fileName: file.name,
        });

        if (!result.success) {
          throw new Error(result.message || "Processing failed");
        }

        toast.success("Summary created successfully! 🎉", {
          duration: 3000,
        });

        router.push(`/summaries/${result.data?.id}`);
      } catch (error) {
        console.error("Upload failed:", error);
        setIsLoading(false);
        toast.error(
          `Upload failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [startUpload, router, isLoading]
  );

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-8">
      <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
      {isLoading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-gray-700 text-center">
            {uploadProgress < 100
              ? `Uploading... ${uploadProgress}%`
              : "Processing PDF and generating summary..."}
          </p>
        </div>
      )}
    </div>
  );
};
export default UploadForm;
