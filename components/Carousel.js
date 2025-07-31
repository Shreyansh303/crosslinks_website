'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, useCallback } from 'react';
import GradientText from './GradientText';
import Link from 'next/link';

const Carousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));

    const autoplay = setInterval(() => {
      if (!isHovered) emblaApi.scrollNext();
    }, 8000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isHovered]);

  useEffect(() => {
    if (!emblaApi) return;

    const resizeViewportToSlide = () => {
      const viewport = emblaRef.current;
      const selectedSlide = viewport?.querySelectorAll('.embla__slide')?.[emblaApi.selectedScrollSnap()];
      if (viewport && selectedSlide) {
        const slideHeight = selectedSlide.offsetHeight;
        viewport.style.height = `${slideHeight}px`;
      }
    };

    emblaApi.on('select', resizeViewportToSlide);
    resizeViewportToSlide(); // Initial height set
  }, [emblaApi]);


  return (
    <div
      className="relative w-full flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      

        <div className='flex justify-between items-center w-full max-w-5xl mb-4 px-4 gap-5'>
            {/* Navigation buttons outside the carousel */}

                <button
                onClick={scrollPrev}
                className="hidden md:block bg-black/60 text-white p-2 rounded-full hover:bg-black transition duration-200 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.4} stroke="#9a9a9a" className="size-14 hover:stroke-[#1cd30c] transiton duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                {/* Embla Carousel */}
                <div className="overflow-hidden w-full max-w-5xl" ref={emblaRef}>
                <div className="flex w-full">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] px-2 min-w-0" // <-- KEY FIX HERE
                    >
                      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#ffffff55] hover:border-[#1cd30c] transition duration-300 cursor-grab">
                        <div className="headingContainer flex flex-col justify-between items-center w-full py-5">
                          {/* imageWrapper */}
                          <div className="imageWrapper flex w-full justify-center items-center">
                            <div className="imageCircle w-30 h-30 md:w-40 md:h-40 p-3">
                              <img
                                loading='lazy'
                                src={slide.image}
                                alt={slide.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                          </div>

                          {/* credentialsWrapper */}
                          <div className="credentialsWrapper flex flex-col md:gap-1 w-full items-center justify-center p-5">
                            <h1 className="text-white text-xl/4.5 sm:text-2xl md:text-3xl/7 text-center font-greater-theory ">
                              {slide.name}
                            </h1>
                            <h2 className="text-white text-base sm:text-lg md:text-xl tracking-[6] text-center font-nexa-light">
                              {slide.position}
                            </h2>
                          </div>

                          {/* Message */}
                          <span className="text-white text-xs sm:text-sm md:text-base text-justify font-main px-5 w-full">
                            {slide.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


                <button
                onClick={scrollNext}
                className="hidden md:block bg-black/60 text-white p-2 rounded-full hover:bg-black transition duration-200 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.4} stroke="#9a9a9a" className="size-14 hover:stroke-[#1cd30c] transiton duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

        </div>

      

      {/* Dot buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition duration-150 ${
              index === selectedIndex ? 'bg-[#1cd30c] scale-150' : 'bg-[#9a9a9a]'
            }`}
          />
        ))}
      </div>


      {/* Learn More button */}
      {/* <Link href='/events'>
        <button className='mt-10 font-nexa-light font-bold text-base'>
                              
          <GradientText
          colors={["#1cd30c", "#E6FF00", "#1cd30c", "#E6FF00", "#1cd30c"]}
          animationSpeed={8}
          showBorder={true}
          className="custom-class"
          >
          LEARN MORE
          </GradientText>

        </button>
      </Link> */}

      

    </div>
  );
};

export default Carousel;
