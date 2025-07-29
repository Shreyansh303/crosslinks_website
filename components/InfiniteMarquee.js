import React from "react";

const InfiniteMarquee = ({ images = [], speed = 25 }) => {
  // To create a seamless loop, we'll duplicate the images array.
  const marqueeImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden">
      {/* The <style> block here is crucial. It defines the CSS animation 
        keyframes and applies them. Using a style tag scoped within the component
        makes it self-contained and easy to drop into any project without 
        modifying global CSS files.
      */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee ${speed}s linear infinite;
          }
          .marquee-container:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
      </style>
      
      {/* The main container that enables the pause-on-hover effect. */}
      <div className="marquee-container">
        {/* The change is here: `flex` was changed to `inline-flex`.
          This ensures the container's width is based on its content,
          making the translateX(-50%) animation seamless.
        */}
        <div className="inline-flex animate-marquee">
          {marqueeImages.map((src, index) => (
            // Each individual image container
            <div key={index} className="flex-shrink-0 p-3">
              <div className="aspect-[4/3] w-64 sm:w-80 md:w-96 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-[#1cd30c]">
                <img
                  src={src}
                  alt={`Marquee item ${index + 1}`}
                  className="w-full h-full object-cover"
                  // Add an onerror fallback for broken image links
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://placehold.co/800x600/1a202c/4a5568?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;