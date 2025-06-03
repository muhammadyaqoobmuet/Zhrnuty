"use client";

import React from "react";
import { useAuth, useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type Plan = {
  id: string;
};

type PricingButtonProps = {
  plan: Plan;
};

const PricingButton: React.FC<PricingButtonProps> = ({ plan }) => {
  const { isSignedIn } = useAuth();

  const router = useRouter();

  async function handleClick(id: string) {
    // store user and save planID to local storeage and redirect to login
    // but i have to redrect it to clerk

    try {
      // Store the selected plan ID in localStorage
      if (!localStorage.getItem("selectedPlan")) {
        localStorage.setItem("selectedPlan", id);
      }

      if (isSignedIn) {
        // User is already signed in, redirect to dashboard or plan selection
        router.push("/dashboard");
      } else {
        router.push("/sign-up");
      }
    } catch (error) {
      console.error("Error handling plan selection:", error);
    }
  }

  return (
    <button
      onClick={() => handleClick(plan.id)}
      disabled={plan.id === "pro" || plan.id == "basic"}
      className={`mt-8 w-full py-3 rounded-full font-medium transition-colors duration-300 ${
        plan.id === "pro" || plan.id == "basic"
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-white shadow-md hover:shadow-lg"
      }`}
    >
      {plan.id === "free"
        ? "Start Free"
        : plan.id === "pro"
        ? "Coming Soon"
        : "Choose Plan"}
    </button>
  );
};

export default PricingButton;
