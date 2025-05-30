"use server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function fetchAndExtractPdfText(pdfUrl: string): Promise<string> {
  if (!pdfUrl?.trim()) {
    throw new Error("PDF URL is required and cannot be empty");
  }

  try {
    console.log("Fetching PDF from:", pdfUrl);

    const response = await fetch(pdfUrl);
    console.log("Response status:", response.status, response.statusText);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch PDF: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    // Validate content type
    if (
      contentType &&
      !contentType.includes("application/pdf") &&
      !contentType.includes("application/octet-stream")
    ) {
      throw new Error(
        `Invalid content type: ${contentType}. Expected PDF file.`
      );
    }

    const pdfBlob = await response.blob();
    console.log("Blob size:", pdfBlob.size, "bytes");
    console.log("Blob type:", pdfBlob.type);

    if (pdfBlob.size === 0) {
      throw new Error("PDF file is empty");
    }

    const arrayBuffer = await pdfBlob.arrayBuffer();
    console.log("ArrayBuffer size:", arrayBuffer.byteLength, "bytes");

    // Check if it's actually a PDF by looking at the header
    const uint8Array = new Uint8Array(arrayBuffer);
    const pdfHeader = String.fromCharCode(...uint8Array.slice(0, 4));
    console.log("File header:", pdfHeader);

    if (pdfHeader !== "%PDF") {
      throw new Error(`Invalid PDF file format. Header: ${pdfHeader}`);
    }

    const loader = new WebPDFLoader(
      new Blob([arrayBuffer], { type: "application/pdf" })
    );

    console.log("Loading PDF with WebPDFLoader...");
    const documents = await loader.load();
    console.log("Documents loaded:", documents.length);

    if (documents.length === 0) {
      throw new Error("No pages found in PDF");
    }

    const extractedText = documents
      .map((doc, index) => {
        console.log(
          `Page ${index + 1} content length:`,
          doc.pageContent.length
        );
        return doc.pageContent;
      })
      .join("\n");

    console.log("Total extracted text length:", extractedText.length);

    if (extractedText.trim().length === 0) {
      throw new Error("PDF contains no extractable text content");
    }

    return extractedText;
  } catch (error) {
    console.error("PDF extraction error:", error);

    // Provide more specific error messages based on the error type
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`Network error: Unable to fetch PDF from ${pdfUrl}`);
    }

    if (error instanceof Error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }

    throw new Error("Unknown error occurred during PDF extraction");
  }
}
