import Image from "next/image";
import React from 'react';

function TopSection({heading, subheading, backgroundImage}:{heading : string, subheading : string , backgroundImage : string}) {
    return (
        <div 
            className="relative w-screen min-h-[50vh] mb-0 flex flex-col items-center justify-center px-4 py-8"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}
        >   
            {/* Text content positioned in the center */}
            <div className="z-10 text-center max-w-4xl mx-auto">
                <h1 className="text-white text-center text-6xl max-md:text-3xl max-lg:text-4xl font-semibold mt-4 mb-2 leading-tight">
                   {heading}
                </h1>
                <p className="text-white text-center text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                    {subheading}   
                </p>
                
            </div>
        </div>
        
    );
}

export default TopSection;