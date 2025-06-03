import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[90vh]">
      <div className="container pt-20 mx-auto flex flex-col items-center justify-center gap-4">
        <SignIn oauthFlow="redirect" />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic"; // This page should always be dynamic
