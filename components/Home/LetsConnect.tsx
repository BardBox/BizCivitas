import Image from "next/image";
import React from 'react';

function LetsConnect() {
    return (
        <div className="mt-20 ">
        
        <div className="w-screen h-screen absolute bg-[#6E81BD]"></div>
        
        <div 
            className=" -translate-y-20 relative w-auto rounded-lg m-8 mb-0 flex flex-col items-center justify-center px-4 py-8"
            style={{
                backgroundImage: "url('/LetsConnect.svg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}
        >   
            {/* Text content positioned in the center */}
            <div className="z-10 text-center max-w-4xl mx-auto">
                <h1 className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
                    Let's bring your vision to life together now!
                </h1>
                <p className="text-white text-center text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                    Take the next step in your business journey by connecting with "BizCivitas".
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                        className="w-[60vw] sm:w-auto bg-gray-800 text-white  rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 min-w-[140px]"
                        style={{ backgroundColor: '#374151' }}
                    >
                        <p className="px-4 py-4">Learn more</p>
                    </button>
                    <button 
                        className="w-[60vw] sm:w-auto bg-blue-600 text-white  rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 min-w-[140px]"
                        style={{ backgroundColor: '#4a62ad' }}
                    >
                        <p className="px-4 py-4">Let's talk</p>
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default LetsConnect;