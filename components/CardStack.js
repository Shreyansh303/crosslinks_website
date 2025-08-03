'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Card Sub-Component now uses topOffset
const Card = ({ image, title, description, index, topOffset }) => {
  return (
    <div
      // Use the topOffset prop to calculate the dynamic top position
      style={{
        top: `calc(${topOffset} + ${index * 1}rem)`,
        zIndex: index,
      }}
      className="card sticky mx-auto flex h-auto max-[480px]:w-95/100 w-4/5 md:w-3/5 max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#ffffff33] bg-[#1a1a1a] shadow-2xl mb-15 last:mb-0"
    >
      <div className="relative w-full aspect-[16/9]">
        <img
          src={image}
          loading="lazy"
          alt={title}
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h2 className="absolute top-4 left-6 max-[391px]:text-xl max-[480px]:text-2xl text-3xl font-greater-theory text-white md:text-5xl">
          {title}
        </h2>
      </div>
      <div className="flex w-full items-center px-6 py-5">
        <p className="text-white text-justify max-[391px]:text-xs max-[480px]:text-sm text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
};

// Main CardStack Component now accepts topOffset
export default function CardStack({ cards = [], topOffset = '5rem' }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // The animation logic remains exactly the same
      const allCards = gsap.utils.toArray('.card');
      allCards.forEach((card) => {
        gsap.to(card, {
          scale: 0.9,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [cards] }
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {cards.map((cardData, index) => (
        <Card
          key={cardData.title + index}
          {...cardData}
          index={index}
          topOffset={topOffset} // Pass the offset down to each card
        />
      ))}
    </div>
  );
}