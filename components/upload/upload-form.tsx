"use client";
import React, { useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import {
  genratePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { generateSummaryFromGeminiApi } from "@/lib/gemni";
import { useRouter } from "next/navigation";
//validation schema
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
  const [resp, setResp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("File uploaded successfully!", res);
      toast.success("File uploaded successfully!", {
        description:
          " file has been uploaded to server wait for transformation",
      });
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    },
    onUploadBegin: (name) => {
      console.log("Upload begin:", name);
      toast(`Starting upload for ${name}...`, {
        duration: 2000,
        icon: <Sparkles className="h-4 w-4" />,
      });
    },
    onUploadProgress: (progress) => {
      console.log("📊 Upload progress:", progress);
      toast(`Upload progress: ${progress}%`, {
        duration: 2000,
        icon: <Sparkles className="h-4 w-4 text-red-700" />,
      });
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
      setIsLoading(true);
      const resp: any = await startUpload([file]);

      if (resp && resp.length > 0) {
        console.log("Upload successful!");
      }

      const response = await genratePdfSummary(resp);
      // get whole text back

      if (response.data?.summary) {
        let storeResults: any;
        toast("finished reading pdf  ", {
          duration: 2000,
          description: "converting into short consice format ....",
        });
        // storing pdf summaries by converting them into short with ai
        const responseFromAi = await generateSummaryFromGeminiApi(
          response.data?.summary
        );

        if (!responseFromAi) {
          toast.error("something went wrong try again!  ", {
            duration: 2000,
            description: "Ai could not convert into short summary try again!",
          });
        }

        toast.success("saving summary  ", {
          duration: 2000,
          description: "saving the summary....",
        });
        storeResults = await storePdfSummaryAction({
          summary: responseFromAi as string,
          fileUrl: resp[0].serverData.fileUrl,
          title: response.data.title,
          fileName: file.name,
        });
        console.log(storeResults);

        if (!storeResults) {
          toast.error("failed to saved pdf in database  ", {
            duration: 2000,
          });
        }
        toast.success("Summary Saved!🎉 ", {
          duration: 2000,
        });

        // redirect user
        router.push(`/summaries/${storeResults?.data?.id}`);
      }

      if (!response.data?.summary) {
        toast.error("unable to reading pdf", { duration: 2000 });
        return;
      }

      setIsLoading(false);
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
  };

  return (
    <div className="flex flex-col  w-full max-w-2xl mx-auto  gap-8">
      <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
      <p>{isLoading ? "loading you summary" : resp}</p>
    </div>
  );
};
export default UploadForm;
