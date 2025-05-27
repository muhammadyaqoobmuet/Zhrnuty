"use client";
import React from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";

const fileScheme = z.object({
  file: z
    .instanceof(File, {
      message: "File is required",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

const UploadForm = () => {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("File uploaded successfully!", res);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    },
    onUploadBegin: (name) => {
      console.log("Upload begin:", name);
    },
    onUploadProgress: (progress) => {
      console.log("📊 Upload progress:", progress);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Here you would typically handle the file upload logic,
    // get form data
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const file = formData.get("file") as File;

    // validate the file type
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    // validation with zod
    const validatedResults = fileScheme.safeParse({ file });

    if (!validatedResults.success) {
      const errorMessage =
        validatedResults.error.flatten().fieldErrors.file?.[0] ||
        "Invalid file";
      alert(errorMessage);
      return;
    }

    // start upload
    try {
      const resp = await startUpload([file]);
      console.log("Upload response:", resp);

      if (resp && resp.length > 0) {
        console.log("Upload successful!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col  w-full max-w-2xl mx-auto  gap-8">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};
export default UploadForm;
