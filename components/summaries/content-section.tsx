import React from "react";
import { MotionDiv } from "../common/moiton-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

function parsePoint(point: string) {
  const isNumbered = /\d+\./.test(point);
  const isMainPoint = /^\./.test(point);
  // Replace the Unicode property escape with a simpler
  // emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}
function parseEmojiPoint(content: string) {
  const cleanContent = content.trim();
  // Better regex to match emojis at the start of content
  const matches = cleanContent.match(
    /^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]+)\s*(.*)$/u
  );

  if (!matches) {
    // Fallback: if no emoji found, return the whole content as text
    return {
      emoji: "",
      text: cleanContent,
    };
  }

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}
const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <MotionDiv
      variants={containerVariants}
      key={points.join("")}
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {points.map((point, index) => {
        const { isNumbered, hasEmoji, isEmpty, isMainPoint } =
          parsePoint(point);
        const emojiPoint = parseEmojiPoint(point);
        const emoji = emojiPoint?.emoji ?? "";
        const text = emojiPoint?.text ?? "";
        console.log(emoji);
        if (hasEmoji || isMainPoint) {
          return (
            <div
              key={`point-${index}`}
              className="group relative bg-gradient-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
            >
              <MotionDiv className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <MotionDiv
                variants={itemVariants}
                className="relative flex items-start gap-3"
              >
                <span className="text-md lg:text-xl shrink-0 pt-1">
                  {emoji}
                </span>
                <p className="text-md lg:text-xl text-muted-foreground/90 leading-relaxed">
                  {text}
                </p>
              </MotionDiv>
            </div>
          );
        }
      })}
    </MotionDiv>
  );
};

export default ContentSection;
