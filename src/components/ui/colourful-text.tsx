'use client';
import { motion } from 'framer-motion'; // Make sure you're using the correct import

export function ColourfulText({ text }: { text: string }) {
  return text.split('').map((char, index) => (
    <motion.span
      key={`${char}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ['blur(0px)', `blur(5px)`, 'blur(0px)'],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block font-['Helvetica_Now_Display'] whitespace-pre tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-900"
    >
      {char}
    </motion.span>
  ));
}
