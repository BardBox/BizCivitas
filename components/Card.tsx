import Image from 'next/image';
import React from 'react';

const Card = ({ 
  logo = 'https://via.placeholder.com/150', // Default logo URL
  title = "Default Title",
  description = "Default description text",
  direction = "row", // "row" or "column"
  titleColor = "#1f2937",
  descriptionColor = "#6b7280",
  className = "",
  ...props
}) => {
  return (
    <div 
      className={`bg-white rounded-lg flex shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${className}`}
      {...props}
    >
      <div className={`flex ${direction === "column" ? "flex-col" : "flex-row"} gap-4 items-start h-full`}>
        {/* Logo Section */}
        <div className={`${direction === "column" ? "" : ""}`}>
          {logo ? (
            typeof logo === 'string' ? (
              <Image 
                src={logo} 
                width={direction === "column" ? 64 : 48}
                height={direction === "column" ? 64 : 48}
                alt="Logo" 
                className={`${direction === "column" ? "w-16 h-16" : "w-12 h-12"}`}
              />
            ) : (
              <div className={`${direction === "column" ? "w-16 h-16" : "w-12 h-12"} flex `}>
                {logo}
              </div>
            )
          ) : (
            <div className={`${direction === "column" ? "w-16 h-16" : "w-12 h-12"} bg-gray-200 rounded flex items-center justify-center`}>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={`flex-1 min-w-0 ${direction === "column" ? "text-start" : ""}`}>
          <h3 
            className={`text-lg font-semibold mb-2 leading-tight`}
            style={{ color: titleColor }}
          >
            {title}
          </h3>
          <p 
            className={`text-sm leading-relaxed`}
            style={{ color: descriptionColor }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;