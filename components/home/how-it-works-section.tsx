import { Step } from "@/types/step";
import { BrainCircuit, FileAxis3DIcon, MoveRight, Upload } from "lucide-react";
import React from "react";

const steps: Step[] = [
  {
    icon: <Upload size={64} strokeWidth={1.5} className=" text-rose-500" />,
    label: "Upload your PDF",
    description: "Upload your PDF file to our platform. ",
  },
  {
    icon: (
      <BrainCircuit size={64} strokeWidth={1.5} className=" text-rose-500" />
    ),
    label: "AI Analysis",
    description:
      "Our AI analyzes the content of your PDF and extracts key information.",
  },
  {
    icon: (
      <FileAxis3DIcon size={64} strokeWidth={1.5} className=" text-rose-500" />
    ),
    label: "Get your summary",
    description:
      "Receive a concise and easy-to-read summary of your PDF in seconds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#e4f8f737] ">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* grad */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="absolute right-[-3rem] top-10 w-[30rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 48.6% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0% 64.9%, 17.9% 100%, 27.6% 76.6%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="text-center  mb-16 ">
          <h2 className="uppercase  font-bold  text-xl mb-4  text-rose-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl  max-w-2xl  mx-auto">
            Transform PDF into easy to read snaps in three steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, i) => (
            <div key={i} className="flex relative items-stretch">
              <StepItem
                key={i}
                icon={step.icon}
                label={step.label}
                description={step.description}
              />
              {i < steps.length - 1 && (
                <div className="hidden  md:block absolute top-1/2 -right-4 transform z-10 -translate-y-1/2">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-500 "
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

export const StepItem = ({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500 transition-colors  group w-full">
      <div className="flex flex-col gap-4 h-full ">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/30 to-transparent group-hover:from-rose-500/15 transition-colors">
          <div className="text-rose-500"> {icon}</div>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
