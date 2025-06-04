import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create instance with optimized configuration
const f = createUploadthing();

// Cache user data to reduce Clerk API calls
const userCache = new Map<string, { user: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedUser(requestKey?: string) {
  const cacheKey = requestKey || "default";
  const cached = userCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.user;
  }

  try {
    const user = await currentUser();
    if (user) {
      userCache.set(cacheKey, { user, timestamp: Date.now() });
    }
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw new UploadThingError("Authentication failed");
  }
}

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1, // Enforce single file upload
    },
  })
    .middleware(async ({ req }) => {
      // Use cached user to reduce API calls
      const user = await getCachedUser();

      if (!user?.id) {
        throw new UploadThingError("Authentication required");
      }

      return {
        userId: user.id,
        userEmail: user.emailAddresses?.[0]?.emailAddress || null,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("✅ Upload Complete:", {
          userId: metadata.userId,
          fileName: file.name,
          fileSize: file.size,
          fileUrl: file.url,
        });

        // Validate required data
        if (!metadata?.userId) {
          throw new Error("Missing user ID in metadata");
        }

        if (!file?.url) {
          throw new Error("Missing file URL");
        }

        // Return optimized data structure
        return {
          userId: metadata.userId,
          fileUrl: file.url, // Use standard file.url
          fileName: file.name,
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
        };
      } catch (error) {
        console.error("❌ Upload callback error:", error);
        throw new UploadThingError(
          error instanceof Error ? error.message : "Upload processing failed"
        );
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
