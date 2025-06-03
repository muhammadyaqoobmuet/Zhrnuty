import React from "react";
import BgGradient from "../common/bg-gradient";
import { Pizza } from "lucide-react";
import { SummaryViewer } from "../summaries/summary-viewer";
import { MotionDiv, MotionH3 } from "../common/moiton-wrapper";

const DemoSection = () => {
  const summary = {
    summary_text: `
    # 🌟 What This App Will Teach You
• 💡 This app turns complex info into clean, brain-friendly bullet points.
• ✍️ You paste a long, boring explanation — it gives you just the good stuff.
• 📋 Great for students, professionals, or anyone who wants to save brain energy.

# 🚀 Instant Value Preview
• 📈 Just by reading this, you already understand what the topic is about.
• 📌 No more reading giant paragraphs or trying to "figure it out.
• 🎯 Clear breakdown = zero confusion.


# ⚙️ How It Works
• 🏛️ It takes your input text and sends it to a smart AI summarizer.
• 🛠️ The AI breaks it down into the main points and sends it back
• 🔮 Your summary is shown in a clean, scrollable card with navigation.

# 💥 Why Use It
• ⚡ Saves you time by skipping the boring parts of long articles.
• 🔬 Helps you understand stuff quickly and clearly.
• 🧑🏼‍💻 Clean UI, smooth experience, no sign-up needed!.

`,
  };
  return (
    <section className="relative mt-20">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="right-0 inset-1" />
        <div className="flex flex-col items-center text-center ">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/70 backdrop-blur-xs border border-gray-500/30 ">
            <Pizza className="w-6 h-6 text-rose-600" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how{" "}
              <span className="font-medium text-rose-600">Zhrnuty</span> turns
              your{" "}
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent font-medium">
                PDF into easy summaries
              </span>
              .
            </MotionH3>
          </div>
          {/* add next */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center items-center px-2 sm:px4  lg:px-6">
              {/* add summary veiw here a toggler like testinonimal */}
              <SummaryViewer summary={summary.summary_text} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
