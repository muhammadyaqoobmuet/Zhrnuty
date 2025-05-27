"use client";
import { FileType2Icon } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import BgGradient from "./bg-gradient";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  const iSLoggedIn = false; // Replace with actual authentication logic

  return (
    <nav className="container bg-transparent  relative flex items-center justify-between py-4 lg:py-8 px-2 mx-auto">
      {/* Logo */}

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
        {
          <SignedIn>
            <NavLink href="/dashboard">Your Summaries</NavLink>
          </SignedIn>
        }
      </div>
      <div className="flex justify-end lg:flex-1">
        <div className="flex gap-2  items-center">
          {/* //if user signined show upload NavLink */}
          {
            <>
              <SignedIn>
                <div className="flex gap-2 items-center">
                  <NavLink
                    href="/upload"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out"
                  >
                    Upload
                  </NavLink>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton oauthFlow="popup">
                  <Button
                    className="text-white text-sm sm:text-base md:text-lg lg:text-xl 
             rounded-full px-4 sm:px-6 lg:px-8 
             py-2 sm:py-3 lg:py-4
             bg-gradient-to-r from-slate-500 to-rose-200 
             hover:from-rose-300 hover:to-slate-700 
             focus-visible:outline-none 
             hover:scale-105 active:scale-100
             shadow-lg transition-all duration-300 ease-in-out 
             font-semibold"
                    variant="default"
                  >
                    <span>Sign in</span>
                  </Button>
                </SignInButton>
              </SignedOut>
            </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
