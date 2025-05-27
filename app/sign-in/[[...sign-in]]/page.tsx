import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn oauthFlow="popup" />;
}
export const dynamic = "force-dynamic"; // This page should always be dynamic
