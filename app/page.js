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
import CardStack from "@/components/CardStack";
import InfiniteMarquee from "@/components/InfiniteMarquee";


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

  const galleryRef = useRef();
  
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
          offsetY: navBarHeight+50,
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
      opacity: 0,
      yPercent: 130,
      stagger: 0.02,
      ease: 'back.out',
      duration: 0.5,
      scrollTrigger: {
          trigger: headingRef.current,
          start: "top 95%",
          end: "top 20%",
          toggleActions: "restart none none reverse",

          onEnter: () => {
            gsap.set(headingRef.current, {opacity: 1})
          }

        }
    })
  }

  function bodyReveal(bodyRef) {

    gsap.fromTo(
      bodyRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', 
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 95%",
          end: "top 20%",
          toggleActions: "restart none none reverse",
        }}
    );
  }

  function imageReveal(imageRef) {
    gsap.from(imageRef.current, {
      xPercent: 150,
      ease: 'power4.inOut',
      duration: 1.2,
      scrollTrigger: {
          trigger: imageRef.current,
          start: "top 95%",
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

    const pinWrapper = eventsRef.current.parentElement;

    ScrollTrigger.create({
      trigger: eventsSectionRef.current,
      start: 'top 14%',
      end: 'bottom 50%',
      pin: pinWrapper,
      pinSpacing: false,
      
      // ✅ Set position WITHOUT changing the width
      onEnter: () => gsap.set(pinWrapper, { 
        left: '50%', 
        xPercent: -50 
      }),

      onLeave: () => gsap.set(pinWrapper, { clearProps: 'left,transform' }),

      // ✅ Set position WITHOUT changing the width
      onEnterBack: () => gsap.set(pinWrapper, { 
        left: '50%', 
        xPercent: -50 
      }),
      
      onLeaveBack: () => gsap.set(pinWrapper, { clearProps: 'left,transform' }),
    });

    headingReveal(galleryRef)

    headingReveal(teamRef)


  }, []);

  const slides = [

    { image: "img/mithilesh.png", 
      name: "MITHILESH KOROCHIKAR",
      position: "PRESIDENT, EXTERNAL AFFAIRS",
      message: "Crosslinks = endless opportunities + unmatched experiences. Everything else you hear? Just background noise.", 
    },

    { image: "img/udita.jpg", 
      name: "UDITA JARODIA",
      position: "PRESIDENT, MEDIA",
      message: "We're not just a team, we're a family, forging a stronger bond with everything we do. What we build here isn't just work - it's love, trust, and legacy in the making!",
    },

    { image: "img/akshath.png", 
      name: "AKSHATH BHAMU",
      position: "VICE PRESIDENT",
      message: "Might genuinely have some of the best connections on here , the people are great, the vibes are immaculate, all in all dont join if youre a loser. peace", 
    },

    { image: "img/gauri.jpg", 
      name: "GAURI BHARDWAJ",
      position: "VICE PRESIDENT",
      message: "We are not just a PR society we are home—the kind where seniors guide, juniors inspire and bonds turn into lifelong friendships. We hustle hard, party harder, and make every campus event unforgettable.", 
    },

    { image: "img/aryan.jpg", 
      name: "ARYAN KHUDLAIN",
      position: "MANAGING EDITOR",
      message: "moj masti nahi rukni chiye", 
    },

    { image: "img/sneha.jpg", 
      name: "SNEHA VATS",
      position: "MANAGING EDITOR",
       
    },

    { image: "img/prisha.png", 
      name: "PRISHA PRIYA",
      position: "MANAGING EDITOR",
      message: "Crosslinks is all about epic events, amazing people, and unforgettable memories. The kind that makes your college journey truly unforgettable!",
       
    },

    { image: "img/abhinav.png", 
      name: "ABHINAV KUMAR",
      position: "MANAGING EDITOR",
       
    },
  ];

  const cards = [

    { image: "img/thon.jpg", 
      title: "NSUTTHON",
      description: "The annual flagship event of crosslinks. It consists of orientations, auditions , workshops and competitions organised by various societies. It is a team - based event which promotes teamwork and leadership qualities. Every team is credited with specific points for every participation and win. It is a race of being - THE ULTIMATE FRESHER.", 
    },

    { image: "img/garba.jpg", 
      title: "GARBA NIGHT",
      description: "Garba night, a sparkling festive lights and colourful decor with dandiya under the dazzling stars.The university lit up in beautiful purple lights and the vibrant songs echoed through the grounds as the students dressed up in pretty ethnic clothes gathered to dance and have fun.",
    },

    { image: "img/moksha.jpg", 
      title: "MR. & MS. MOKSHA",
      description: "Mr. and Ms. Moksha, an event held at our college, is a celebration of charisma, talent, and personality. This competition showcases the finest qualities of students as they compete for the title with confidence and style.",
    },

    { image: "img/scribble.jpg", 
      title: "SCRIBBLE DAY",
      description: "Scribble Day is a creative see off to our beloved seniors. Cute, funny and some outrageous messages are signed off on t-shirts and even body parts during the event. Together with music and a lot of pictures to capture memories worth many years.", 
    },

    { image: "img/farewell.jpg", 
      title: "FAREWELL",
      description: "Farewell day is a bittersweet occasion, marking the end of an important chapter in one's life and the start of a new journey. We at crosslinks organized a farewell day party bidding them a goodbye and wishing them for a new journey in their lives. Their memories and the bonds they formed will always be remembered and will be cherished.", 
    },

    { image: "img/alumni.jpg", 
      title: "ALUMNI MEET",
      description: "A lovely reunion for all the alumni to reminisce about their good old days together. The alumni gathered to share their experiences with the students and discuss new ideas. The alumni were also facilitated and live music during the evening made the event enjoyable.It was organized in collaboration with Alumni Association, NSUT.", 
    },

  ];

  const sampleImages = [
    "img/gallery1.jpg",
    "img/gallery2.jpg",
    "img/gallery3.jpg",
    "img/gallery4.jpg",
    "img/gallery5.jpg",
    "img/gallery6.jpg",
    "img/gallery7.jpg",
    "img/gallery8.jpg",
    "img/gallery9.jpg",
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

          <div className="title flex flex-col gap-0 sm:gap-1 items-center justify-center">
            <h1 className="font-greater-theory max-[400px]:text-4xl font-light text-5xl sm:text-6xl md:text-8xl ">CROSSLINKS</h1>
            <h2 className="font-nexa-light max-[400px]:text-xs max-[400px]:tracking-[8] text-xl tracking-[10] sm:text-2xl md:text-3xl md:tracking-[18]">THE FACE OF NSUT</h2>
          </div>

        </div>

        {/* About Us  */}

        <div ref={aboutUsSectionRef} className="aboutUs my-5">

          <h1 id="aboutUs" ref={aboutUsRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c] text-center">
            ABOUT US
          </h1>

          <div className="flex flex-col my-2 gap-5 items-center justify-center">
            <p ref={aboutUsTextRef} className="font-main font-light max-[480px]:text-xs text-base sm:text-lg md:text-xl/7 text-justify">
              Crosslinks is the Student & Public Relations Society of NSUT. It is one of the most well-known societies of our college. It brings to you everything there is to know about NSUT and puts our institution on a national platform. Whether it&apos;s about connecting students and authorities together, promoting the college, or organizing numerous events and fests throughout the year, Crosslinks does it all.
            </p>
            
            <div className=" flex items-center justify-center max-[480px]:w-95/100 w-4/5 md:w-3/5 h-auto overflow-x-hidden"><img ref={aboutUsImageRef} className="w-full h-auto border-3 border-[#1cd30c] rounded-xl" src="/img/CROSSLINKS.jpg" alt="" /></div>
          </div>

        </div>
        
        <Separator/>

        {/* Events */}

        <div ref={eventsSectionRef} className="events w-full flex flex-col items-center justify-center max-[391px]:gap-5 gap-10 my-5">
          <div className="text-center"> 
            <h1 ref={eventsRef} className="text-4xl sm:text-5xl md:text-6xl font-greater-theory text-[#1cd30c] inline-block">
              EVENTS
            </h1>
          </div>

          <CardStack cards={cards} topOffset="12rem"/>

        </div>
        
        <Separator/>

        {/* Gallery */}

        <div className="gallery flex flex-col items-center justify-center gap-5 sm:gap-10 my-5">

          <h1 ref={galleryRef} className="text-4xl sm:text-5xl md:text-6xl text-center font-greater-theory text-[#1cd30c]">
            GALLERY
          </h1>

          <InfiniteMarquee images={sampleImages} speed={40} />

        </div>
        
        <Separator/>

        {/* Words from members */}

        <div ref={teamSectionRef} className="events flex flex-col items-center justify-center gap-10 sm:gap-15 my-5">

          <span ref={teamRef} className="text-4xl sm:text-5xl md:text-6xl text-center font-greater-theory text-[#1cd30c]">
            WORDS FROM CORE
          </span>

          <Carousel slides={slides} />

        </div>
        
        <Separator/>

      </div>

      


    </div>

    
  );
}