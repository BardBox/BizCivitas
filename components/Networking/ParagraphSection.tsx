import React from "react";
import { Paragraph } from "@/types/blogs.types";
import Image from "next/image";

type ParagraphSectionProps = {
  paragraph: Partial<Paragraph>;
  className?: string;
};

export default function ParagraphSection({ paragraph, className = "" }: ParagraphSectionProps) {
  return (
    <section className={`px-4 sm:px-10 lg:px-14 py-4 max-w-[1440px] w-full ${className}`}>
      {/* Title */}
      {paragraph.title && (
        <h2 className="text-2xl font-bold mb-6" id="information-collection">
          {paragraph.title}
        </h2>
      )}
       
      {/* Content Top */}
      {paragraph.contentTop && (
        <p className="text-gray-800 mb-6">{paragraph.contentTop}</p>
      )}
       
      {/* Image Row */}
      {(paragraph.imageUrl_1 || paragraph.imageUrl_2) && (
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {paragraph.imageUrl_1 && (
            <div className="relative w-full sm:w-1/2 h-80 sm:h-92">
              <Image
                fill
                src={paragraph.imageUrl_1}
                alt="Image 1"
                className="rounded-lg object-contain"
              />
            </div>
          )}
          {paragraph.imageUrl_2 && (
            <div className="relative w-full sm:w-1/2 h-80 sm:h-92">
              <Image
                fill
                src={paragraph.imageUrl_2}
                alt="Image 2"
                className="rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      )}

      {/* List Items */}
      {paragraph.listItems && paragraph.listItems.length > 0 && (
        <ul className="space-y-2 text-gray-700 ml-6 mb-6">
          {paragraph.listItems.map((item, index) => {
            const splitIndex = item.indexOf(":");
            const keyword = splitIndex !== -1 ? item.slice(0, splitIndex) : "";
            const description = splitIndex !== -1 ? item.slice(splitIndex + 1).trim() : item;
             
            return (
              <li key={index} className="flex items-start space-x-2">
                {paragraph.listItemIcon && (
                  <Image
                    width={16}
                    height={16}
                    src={paragraph.listItemIcon || ""}
                    alt="icon list svg"
                    className="rounded-full object-contain mt-1"
                  />
                )}
                <span>
                  {keyword ? (
                    <>
                      <span className="font-semibold underline">{keyword}</span>
                      {description ? `: ${description}` : ""}
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
        
      {/* Content Bottom */}
      {paragraph.contentBottom && (
        <p className="text-gray-800">{paragraph.contentBottom}</p>
      )}
    </section>
  );
}