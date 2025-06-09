"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 max-w-[1440px] w-screen mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-3 transition-all duration-300"
        >
          <button
            className="w-full text-left font-semibold flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleIndex(index)}
          >
            <span className="text-lg text-gray-800">{item.question}</span>
            <span className="text-2xl text-gray-500">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="text-gray-600 pl-4 pr-4 pt-2 pb-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}