import { FileType2Icon } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";

const Header = () => {
  const iSLoggedIn = false; // Replace with actual authentication logic

  return (
    <nav className="container flex items-center justify-between py-4 lg:py-8 px-2 mx-auto">
      <div className="flex lg:flex-1 ">
        <NavLink
          href="/"
          className="flex items-center text-gray-900 hover:text-gray-700 transition-colors duration-300 ease-in-out gap-1 lg:gap-2 shrink-0"
        >
          <FileType2Icon className="h-5 w-5  lg:w-8 lg:h-8 text-gray-900 hover:rotate-6 items-center transition-all duration-300 ease-in-out" />
          <span className="font-extrabold lg:text-2xl text-gray-900">
            Zhrnuty.
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        {iSLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>
      <div className="flex justify-end lg:flex-1">
        <div className="flex gap-2  items-center">
          {/* //if user signined show upload NavLink */}
          {iSLoggedIn ? (
            <NavLink
              href="/upload"
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out"
            >
              Upload
            </NavLink>
          ) : (
            <NavLink href="/sign-in">Sign In</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
