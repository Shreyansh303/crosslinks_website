'use client'
import "./globals.css";
import Image from "next/image";
import { Separator } from '../components/Separator';
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useTrigger } from "@/context/TriggerContext";
import Carousel from "@/components/Carousel";
import GradientText from "@/components/GradientText";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

export default function Home() {

  const {trigger,settrigger, buttonPressed, setbuttonPressed, navBarRef} = useTrigger();

  const overlayRef = useRef();

  const homeSectionRef = useRef();
  const aboutUsSectionRef = useRef();
  const eventsSectionRef = useRef();
  const teamSectionRef = useRef();

  const aboutUsRef = useRef();
  const aboutUsTextRef = useRef();
  const aboutUsImageRef = useRef();
  
  const eventsRef = useRef();
  
  const teamRef = useRef();

  const [showOverlay, setShowOverlay] = useState(true);

  function scrollTo(sectionRef) {
  if (!navBarRef.current || !sectionRef.current) {
    return
  }
    setTimeout(() => {
      const navBarHeight = navBarRef.current.offsetHeight;
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: sectionRef.current.offsetTop,
          offsetY: navBarHeight+105,
          autoKill: false 
        },
        ease: "power1.inOut",
      });

    }, 100); 
  }


  function headingReveal(headingRef) {
    const mySplitText = new SplitText(headingRef.current, {type: "chars"});
    const chars = mySplitText.chars;

    gsap.from(chars, {
      yPercent: 130,
      stagger: 0.02,
      ease: 'back.out',
      duration: 1,
      scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          end: "top 20%",
          toggleActions: "restart none none none",
        }
    })
  }

  function bodyReveal(bodyRef) {

    gsap.fromTo(
      bodyRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', 
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 90%",
          end: "top 20%",
          toggleActions: "restart none none reverse",
        }}
    );
  }

  function imageReveal(imageRef) {
    gsap.from(imageRef.current, {
      xPercent: 150,
      ease: 'power4.inOut',
      duration: 1.5,
      scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }
    })
  }

  useEffect(() => {

    if (trigger){ 
      if (buttonPressed==='home') {
        scrollTo(homeSectionRef);
      } else if (buttonPressed==='aboutUs') {
        scrollTo(aboutUsSectionRef);
      } else if (buttonPressed==='events') {
        scrollTo(eventsSectionRef);
      } else if (buttonPressed==='yearbook') {

      } else if (buttonPressed==='team') {
        scrollTo(teamSectionRef);
      }

      settrigger(false);
      setbuttonPressed('');

    }
    
  }, [trigger,buttonPressed])
  

  // Welcome overlay fade-out
  useGSAP(() => {
    // Disable scroll right away
    document.body.style.overflow = 'hidden';

    // Start fade-out after short delay
    const timeout = setTimeout(() => {
      // Re-enable scroll just before animation starts
      document.body.style.overflow = 'auto';

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out',
        onComplete: () => setShowOverlay(false)
      });
    }, 1000); // corresponds to your delay

    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {

    headingReveal(aboutUsRef)
    bodyReveal(aboutUsTextRef)
    imageReveal(aboutUsImageRef)

    headingReveal(eventsRef)

    headingReveal(teamRef)


  }, []);

  const slides = [

    { image: "img/slide1.png", 
      text: "NSUTTHON",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nobis dicta iusto reiciendis ab, accusamus ratione veniam, perspiciatis, magnam harum voluptates asperiores. Maxime quam id laboriosam ullam, repellendus beatae aspernatur!", 
    },

    { image: "img/slide2.jpg", 
      text: "MR. & MS. MOKSHA",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nobis dicta iusto reiciendis ab, accusamus ratione veniam, perspiciatis, magnam harum voluptates asperiores. Maxime quam id laboriosam ullam, repellendus beatae aspernatur!",
    },

    { image: "img/slide3.jpg", 
      text: "SCRIBBLE DAY",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nobis dicta iusto reiciendis ab, accusamus ratione veniam, perspiciatis, magnam harum voluptates asperiores. Maxime quam id laboriosam ullam, repellendus beatae aspernatur!", 
    },
  ];

  return (

    <div>

      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-screen bg-black text-white flex items-center justify-center z-50">
          <h1 className=" text-2xl sm:text-5xl font-nexa-light">WELCOME</h1>
        </div>
      )}

      <div className="flex flex-col font-main mx-auto px-4 w-full max-w-[1280px]">
        
        <div ref={homeSectionRef} className="home flex justify-center items-center h-screen">

          <div className="title flex flex-col gap-1 items-center justify-center">
            <h1 className="font-greater-theory max-[400px]:text-4xl font-light text-5xl sm:text-6xl md:text-8xl ">CROSSLINKS</h1>
            <h2 className="font-nexa-light max-[400px]:text-base max-[400px]:tracking-[8] text-xl tracking-[10] sm:text-2xl md:text-3xl md:tracking-[18]">THE FACE OF NSUT</h2>
          </div>

        </div>

        {/* About Us  */}

        <div ref={aboutUsSectionRef} className="aboutUs my-5">

          <h1 id="aboutUs" ref={aboutUsRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c] text-center">
            ABOUT US
          </h1>

          <div className="flex flex-col my-2 gap-5 items-center justify-center">
            <p ref={aboutUsTextRef} className="font-main font-light max-[480px]:text-xs text-base sm:text-lg md:text-xl/8 text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas vel porro illo amet sint tempore? Dolores error sapiente dolorum, corrupti obcaecati quos facere, cupiditate sequi, quisquam fugiat eius sit quia!
            </p>

            <div className="flex items-center justify-center overflow-x-hidden"><img ref={aboutUsImageRef} className="max-[480px]:w-95/100 w-4/5 md:w-3/5 h-auto border-3 border-[#1cd30c] rounded-xl" src="/img/CROSSLINKS.jpg" alt="" /></div>
          </div>

        </div>
        
        <Separator/>

        <div ref={eventsSectionRef} className="events flex flex-col items-center justify-center gap-10 my-5">

          <h1 ref={eventsRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c]">
            EVENTS
          </h1>

          <div className="carousel">

            <Carousel slides={slides} />

          </div>

        </div>
        
        <Separator/>

        <div ref={teamSectionRef} className="events flex flex-col items-center justify-center gap-10 my-10">

          <h1 ref={teamRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c]">
            TEAM
          </h1>

          <div className="carousel">

            <Carousel slides={slides} />

          </div>
          
        </div>
        
        <Separator/>

      </div>

      


    </div>

    
  );
}