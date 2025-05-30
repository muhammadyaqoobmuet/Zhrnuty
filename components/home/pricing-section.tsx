import React from "react";
import { Badge } from "../ui/badge";
import { Check, Star, Sparkles } from "lucide-react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  description?: string;
  price: string;
  badge?: string;
  note?: string;
  priceBefore?: string;
  items: string[];
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Get started – no risk",
    price: "$0",
    badge: "Most Popular",
    note: "Perfect for individuals",
    items: ["5 summaries ", "1 PDF at a time", "Basic support"],
  },
  {
    id: "basic",
    name: "Basic",
    description: "🚀 Best for growing teams",
    price: "$7/month",
    badge: "🚀 Best Value",
    note: "Just 23¢ a day – less than a coffee ☕",
    items: ["400 summaries ", "5 PDFs at a time", "Priority support"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "💼 For serious scaling",
    price: "$17/month",
    badge: "Power Users",
    note: "Only 56¢ a day – invest in growth 💡",
    items: ["Unlimited summaries", "Unlimited PDFs", "Dedicated support"],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-gradient-to-b from-white to-gray-50">
      <div className="py-12 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-rose-100 to-blue-100 px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">
                Transparent Pricing
              </span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple pricing,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                powerful results
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-rose-200/40 to-blue-200/40 -rotate-1 rounded-lg transform -skew-y-1"
              ></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our
            advanced PDF summarization technology with enterprise-grade
            security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            All plans include a 14-day satisfaction guarantee. Questions?{" "}
            <Link
              href="/contact"
              className="text-rose-600 hover:text-rose-800 font-medium"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan }: { plan: Plan }) => {
  const isPopular =
    plan.badge === "Most Popular" || plan.badge === "🚀 Best Value";
  const isBestValue = plan.badge === "🚀 Best Value";

  return (
    <div
      className={`relative flex flex-col h-full p-6 ${
        isPopular
          ? "bg-white border-rose-100 shadow-lg shadow-rose-100/30"
          : "bg-white border-gray-300 shadow-md"
      } border-2 rounded-xl hover:shadow-xl transition-all duration-300 ease-in-out ${
        isBestValue
          ? "transform lg:scale-105 hover:-translate-y-1 border-rose-300"
          : isPopular
          ? "transform hover:-translate-y-1"
          : ""
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge
            variant={"secondary"}
            className={`px-3 py-1 text-xs font-medium ${
              plan.badge === "Most Popular"
                ? "bg-rose-100 text-red-400"
                : plan.badge === "🚀 Best Value"
                ? "bg-rose-200 text-rose-900"
                : "bg-purple-100 text-purple-700"
            } rounded-full`}
          >
            {plan.badge === "Most Popular" && (
              <Star className="h-3 w-3 mr-1 inline" />
            )}
            {plan.badge}
          </Badge>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
      <p className="mt-2 text-gray-600">{plan.description}</p>

      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
        {plan.priceBefore && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            {plan.priceBefore}
          </span>
        )}
      </div>

      {plan.note && <p className="mt-1 text-sm text-gray-500">{plan.note}</p>}

      <ul className="mt-6 space-y-3 flex-grow">
        {plan.items.map((item, i) => (
          <li key={i} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>

      <button
        disabled={plan.id === "pro"}
        className={`mt-8 w-full py-3 rounded-full font-medium transition-colors duration-300 ${
          plan.id === "pro"
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
    </div>
  );
};

export default PricingSection;
