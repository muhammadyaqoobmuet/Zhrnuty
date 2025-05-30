export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension and replace special characters with spaces
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension
    .replace(/[_-]+/g, " ") // Replace dashes and underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space between camelCase

  // Convert to title case (capitalize first letter of each word)
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}
export function formatFileName(url: string): string {
  // Get the last part after the last slash, which is usually the file name
  const fileName = url.split("/").pop() || "";

  return (
    fileName
      // Remove the file extension like ".png", ".jpg", etc.
      .replace(/\.[^.\/]+$/, "")
      // Replace underscores and hyphens with spaces
      .replace(/[_-]/g, " ")
      // Split the string into words
      .split(" ")
      // Capitalize the first letter of each word and lowercase the rest
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      // Join the words back into a single string with spaces
      .join(" ")
  );
}
