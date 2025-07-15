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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {

  const {trigger,settrigger, buttonPressed, setbuttonPressed} = useTrigger();

  const overlayRef = useRef();
  const homeSectionRef = useRef();
  const aboutUsSectionRef = useRef();
  const eventsSectionRef = useRef();
  const teamSectionRef = useRef();

  const aboutUsRef = useRef();
  const aboutUsTextRef = useRef();
  
  const eventsRef = useRef();
  
  const teamRef = useRef();

  const [showOverlay, setShowOverlay] = useState(true);

  function scrollTo(sectionRef) {
    gsap.to(window, {duration: 2, scrollTo: {y: sectionRef.current, offsetY: 130, autoKill: true} })
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
  useEffect(() => {
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
    gsap.fromTo(
      [aboutUsRef.current, aboutUsTextRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', 
        scrollTrigger: {
          trigger: [aboutUsTextRef.current],
          start: "top 100%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }}
    );

    gsap.fromTo(
      [eventsRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', 
        scrollTrigger: {
          trigger: [eventsRef.current],
          start: "top 100%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }}
    );

    gsap.fromTo(
      [teamRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', 
        scrollTrigger: {
          trigger: [teamRef.current],
          start: "top 100%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }}
    );

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
        {/* <Separator/> */}
        
        <div ref={homeSectionRef} className="home flex justify-center items-center h-screen">

          <div className="title flex flex-col gap-1 items-center justify-center">
            <h1 className="font-greater-theory max-[400px]:text-4xl font-light text-5xl sm:text-6xl md:text-8xl ">CROSSLINKS</h1>
            <h2 className="font-nexa-light max-[400px]:text-base max-[400px]:tracking-[8] text-xl tracking-[10] sm:text-2xl md:text-3xl md:tracking-[18]">THE FACE OF NSUT</h2>
          </div>

        </div>


        <div ref={aboutUsSectionRef} className="aboutUs my-10">

          <h1 id="aboutUs" ref={aboutUsRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c]">
            ABOUT US
          </h1>

          <p ref={aboutUsTextRef} className="font-main text-xs sm:text-base md:text-xl text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid rerum modi, repellendus nam ipsa hic culpa incidunt eligendi, saepe deserunt adipisci ex tempore obcaecati id, fugiat laboriosam quae vitae vero blanditiis. Nobis vel mollitia laboriosam, reprehenderit sunt nam quo, hic, tempora quaerat totam error repellat voluptatum dolore dolorum explicabo nisi sequi? Veniam repudiandae eaque officiis dolore recusandae placeat porro exercitationem nisi dignissimos culpa provident adipisci, voluptas, rerum possimus qui optio quasi, voluptate illo dolores doloribus veritatis illum totam. Deleniti mollitia at quibusdam! Omnis animi ratione vero non laborum asperiores facere natus eos! Consectetur eaque quaerat ullam autem qui repellendus, eum voluptate aliquam impedit? Praesentium ipsam esse veniam omnis nobis placeat amet fugiat quisquam, sequi illum delectus accusantium nostrum unde non, ullam dicta. Veritatis velit eum enim voluptas alias delectus animi atque, sed veniam expedita voluptatum? Sequi dolor rem laborum corporis mollitia voluptatem, laudantium aperiam blanditiis voluptates sunt doloribus nam neque esse veritatis explicabo rerum provident unde voluptate sapiente incidunt asperiores atque ad. Nam molestiae nobis, veritatis temporibus soluta vero quos quia, nulla suscipit qui illo ad cumque ex ducimus nostrum reiciendis beatae error recusandae, harum vitae iure repellat? Dolor corrupti consectetur dolore, quibusdam ducimus iusto aut nesciunt velit veniam rem! Minima, delectus possimus cupiditate ex reiciendis, facere ullam, blanditiis nulla incidunt ad nobis atque! Aut ex nisi magni provident placeat voluptatibus sapiente maxime odit quod enim, nemo distinctio molestiae officiis minus, dignissimos earum possimus, est vel! Facilis quas ad asperiores laboriosam consectetur quis quasi eum, voluptas deserunt illo assumenda! Minus sit tempora hic vel nemo quis voluptate blanditiis iste iusto, dignissimos cumque fuga in facere sapiente quia? Voluptas iste iure obcaecati hic, mollitia rerum, quia ad perferendis harum illo est, repellendus omnis tempore. Nisi, ipsum.
          </p>

        </div>
        
        <Separator/>

        <div ref={eventsSectionRef} className="events flex flex-col items-center justify-center gap-10 my-10">

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