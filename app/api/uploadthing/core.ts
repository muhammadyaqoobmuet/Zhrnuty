/// create instance of uploadThing

import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// creating instance of uploadThing
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "8MB" },
  })
    .middleware(async ({ req }) => {
      // get user info
      const user = await currentUser();
      if (!user) {
        throw new UploadThingError("dont have accsess");
      }
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("✅ Upload Callback Triggered");
        console.log("Metadata:", metadata);
        console.log("File:", file);
        
        if (!metadata?.userId || !file?.url) {
          throw new Error("Missing userId or file URL");
        }

        // You can save to database here if needed
        
        return {
          userId: metadata.userId,
          fileUrl: file.ufsUrl, // Use file.ufsUrl instead of file.url
          fileName: file.name,
        };
      } catch (error) {
        console.error("Upload callback error:", error);
        throw new UploadThingError("Failed to process upload");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
