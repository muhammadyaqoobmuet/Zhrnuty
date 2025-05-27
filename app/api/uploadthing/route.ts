import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import dynamic from "next/dynamic";

export const runtime = "nodejs"; // Use edge runtime for better performance

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
