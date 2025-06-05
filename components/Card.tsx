import Image from "next/image";

const Card = ({ 
  logo = '',
  title = "Default Title",
  description = "Default description text",
  direction = "row", // "row" or "column"
  columnCenter = false, // centers everything when direction is "column"
  titleColor = "#1f2937",
  descriptionColor = "#6b7280",
  className = "",
  ...props
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${className}`}
      {...props}
    >
      <div className={`flex ${direction === "column" ? "flex-col" : "flex-row"} gap-4 ${direction === "column" && columnCenter ? "items-center text-center" : "items-start"} h-full`}>
        {/* Logo Section */}
        <div className={`flex-shrink-0 ${direction === "column" && !columnCenter ? "self-center" : ""}`}>
          {logo ? (
            typeof logo === 'string' ? (
              <Image
                src={logo} 
                alt="Logo" 
                width={direction === "column" ? 64 : 48}
                height={direction === "column" ? 64 : 48}
                className={`${direction === "column" ? "w-16 h-16" : "w-12 h-12"} object-contain rounded`}
              />
            ) : (
              <div className={`${direction === "column" ? "w-16 h-16" : "w-12 h-12"} flex items-center justify-center`}>
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
        <div className={`flex-1 min-w-0 ${direction === "column" && !columnCenter ? "text-center" : ""}`}>
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