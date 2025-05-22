"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname == href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "text-gray-600 hover:text-rose-500 transition-colors duration-200 ease-in-out text-sm",
        className,
        isActive && "text-rose-500 font-semibold"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
