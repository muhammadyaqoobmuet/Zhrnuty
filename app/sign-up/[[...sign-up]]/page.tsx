import BgGradient from "@/components/common/bg-gradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[80vh]">
      <BgGradient />
      <div className="container py-2 pb-10 mx-auto flex flex-col items-center justify-center gap-4">
        <SignUp oauthFlow="popup" />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic"; // This page should always be dynamic
