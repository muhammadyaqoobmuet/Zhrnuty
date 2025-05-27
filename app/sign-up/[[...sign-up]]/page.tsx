import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp oauthFlow="popup" />;
}
export const dynamic = "force-dynamic"; // This page should always be dynamic
