import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#8338ec2a] text-[#8338ec] border-[1px] border-[#8338ecbb]",
  "bg-[#3a86ff2a] text-[#3a86ff] border-[1px] border-[#3a86ffbb]",
  "bg-[#fb56072a] text-[#fb5607] border-[1px] border-[#fb5607bb]",
  "bg-[#9b5de52a] text-[#9b5de5] border-[1px] border-[#9b5de5bb]",
  "bg-[#f15bb52a] text-[#f15bb5] border-[1px] border-[#f15bb5bb]",
];

export const bgThemes = [
  "bg-[#00BB00]", //Primary
  "bg-[#0B0C0B]", //Dark
  "bg-[#101110]", //Dark Dark
  "bg-[#181C18]", //Dark Light
];

export const textThemes = ["text-[#17D617]"];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // Fallback to the first color if out of range
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};
