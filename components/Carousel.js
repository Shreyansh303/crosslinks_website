'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, useCallback } from 'react';
import GradientText from './GradientText';
import Link from 'next/link';

const Carousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isHovered]);

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
                    <div className="flex">
                    {slides.map((slide, index) => (
                        <div className="flex-[0_0_100%] px-2" key={index}>
                        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#ffffff55] hover:border-[#1cd30c] transition duration-300 cursor-grab ">
                            <img
                            src={slide.image}
                            alt={slide.text}
                            className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="absolute inset-0 flex items-start justify-start pl-6 pt-4">
                                <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-greater-theory">{slide.text}</h2>
                            </div>
                            <div className="absolute inset-0 flex items-end justify-center px-6 pb-4">
                                <span className="text-white text-[10px] sm:text-sm md:text-base text-justify font-main">{slide.desc}</span>
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

      <Link href='/events'>
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
      </Link>

      

    </div>
  );
};

export default Carousel;
