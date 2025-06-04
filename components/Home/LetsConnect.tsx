import Image from "next/image";
import React from 'react';
import Link from 'next/link';

function LetsConnect() {
    return (
        <section className="mt-20 relative" aria-labelledby="lets-connect-heading">
            {/* Background with proper semantic structure */}
            <div 
                className="w-screen h-screen absolute bg-[#6E81BD]" 
                aria-hidden="true"
                role="presentation"
            />
            
            <div 
                className="-translate-y-20 relative w-auto rounded-lg m-8 mb-0 flex flex-col items-center justify-center px-4 py-8 min-h-[60vh]"
                style={{
                    backgroundImage: "url('/LetsConnect.svg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }}
                role="banner"
                aria-label="Let's Connect call-to-action section"
            >   
                {/* Text content positioned in the center */}
                <div className="z-10 text-center max-w-4xl mx-auto">
                    <h2 
                        id="lets-connect-heading"
                        className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight"
                    >
                        Let's bring your vision to life together now!
                    </h2>
                    <p 
                        className="text-white text-center text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto"
                        aria-describedby="lets-connect-heading"
                    >
                        Take the next step in your business journey by connecting with BizCivitas.
                    </p>
                    
                    {/* Improved CTA buttons with proper links */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            href="/discover"
                            className="w-[60vw] sm:w-auto bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 min-w-[140px] inline-block"
                            style={{ backgroundColor: '#374151' }}
                            aria-label="Learn more about BizCivitas services and offerings"
                        >
                            <span className="block px-4 py-4">Learn more</span>
                        </Link>
                        
                        <Link 
                            href="/contact"
                            className="w-[60vw] sm:w-auto bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 min-w-[140px] inline-block"
                            style={{ backgroundColor: '#4a62ad' }}
                            aria-label="Contact BizCivitas to start your business journey"
                        >
                            <span className="block px-4 py-4">Let's talk</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LetsConnect2() {
    return (
        <section className="mt-20 relative" aria-labelledby="lets-connect-2-heading">
            {/* Background with proper semantic structure */}
            <div 
                className="w-screen h-screen absolute bg-[#50C26F]" 
                aria-hidden="true"
                role="presentation"
            />
            
            <div 
                className="-translate-y-20 relative w-auto rounded-lg m-8 mb-0 flex flex-col items-center justify-center px-4 py-8 min-h-[60vh]"
                style={{
                    backgroundImage: "url('/discovery/letsConnect.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }}
                role="banner"
                aria-label="Let's Connect discovery call-to-action section"
            >   
                {/* Text content positioned in the center */}
                <div className="z-10 text-center max-w-4xl mx-auto">
                    <h2 
                        id="lets-connect-2-heading"
                        className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight"
                    >
                        Let's bring your vision to life together now!
                    </h2>
                    <p 
                        className="text-white text-center text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto"
                        aria-describedby="lets-connect-2-heading"
                    >
                        Take the next step in your business journey by connecting with BizCivitas.
                    </p>
                    
                    {/* Improved CTA buttons with proper links */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            href="/insights"
                            className="w-[60vw] sm:w-auto bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 min-w-[140px] inline-block"
                            style={{ backgroundColor: '#374151' }}
                            aria-label="Explore business insights and resources from BizCivitas"
                        >
                            <span className="block px-4 py-4">Learn more</span>
                        </Link>
                        
                        <Link 
                            href="/membership"
                            className="w-[60vw] sm:w-auto bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 min-w-[140px] inline-block"
                            style={{ backgroundColor: '#4a62ad' }}
                            aria-label="Join BizCivitas membership and start networking"
                        >
                            <span className="block px-4 py-4">Let's talk</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { LetsConnect2 };
export default LetsConnect;