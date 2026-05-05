"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeUpReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "header" | "ul";
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  as = "div",
  once = true,
  amount = 0.2,
}: Props) {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeUpReduced : fadeUp;
  const Component = motion[as];
  // Motion's exactOptionalPropertyTypes-strict types reject style keys with `| undefined`.
  // We cast to a permissive object type since we only ever pass plain CSSProperties values.
  const motionProps = {
    className,
    variants,
    initial: "hidden",
    whileInView: "show",
    viewport: { once, amount },
    transition: {
      duration: reduced ? 0 : 0.6,
      delay: reduced ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
    ...(style ? { style: style as Record<string, string | number> } : {}),
    children,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component {...(motionProps as any)} />;
}

export function RevealStagger({
  children,
  className,
  staggerChildren = 0.08,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "ul";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : staggerChildren },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "a";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={reduced ? fadeUpReduced : fadeUp}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
