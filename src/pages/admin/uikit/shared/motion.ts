import type { Variants } from "motion/react";

// Shared entrance variants for UI Kit docs pages, backed by the Foundations
// motion spec (fast 100ms / normal 200ms / slow 300ms). Consumers should pair
// these with useReducedMotion() from "motion/react" and skip animation when true.

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
