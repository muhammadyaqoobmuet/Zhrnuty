"use client";
import Image from "next/image";

export default function Component() {
  return (
    // Responsive container with dynamic height
    <div className="relative w-full min-h-[600px] h-[90vh] rounded-2xl max-w-6xl  px-4 pt-8 pb-16 group bg-blue-100/60">
      <div className="w-full rounded-2xl relative">
        <Image
          className="w-full bg-cover rounded-2xl"
          width={1000}
          height={1000}
          src="/uploadpic.png"
          alt={""}
        />

        <div className="absolute right-0 t">
          <Image
            className="w-full bg-cover rounded-2xl"
            width={1000}
            height={1000}
            src="/summarypic.png"
            alt={""}
          />
        </div>
      </div>
    </div>
  );
}
