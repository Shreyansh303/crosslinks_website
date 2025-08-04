'use client'
import React, { useState } from 'react';
import "../styles/navbar.css";
import ShinyText from '../components/ShinyText';
import GradientText from '../components/GradientText'
import { useTrigger } from '@/context/TriggerContext';
import Link from 'next/link';

export const NavBar = () => {

  const { settrigger, setbuttonPressed, navBarRef } = useTrigger();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav ref={navBarRef} className='flex glassmorphism justify-between items-center px-5 py-3 font-nexa-light font-bold text-base 
        mx-auto max-[480px]:my-1 my-4 w-full max-w-[1200px] centered z-50'>      

        <div className="max-[480px]:w-18 w-25"><img src="img/logo.png" alt="" /></div>
        
        <ul className='hidden md:flex gap-8'>
            <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('home')}}>HOME</li>
            <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('aboutUs')}}>ABOUT US</li>
            <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('events')}}>EVENTS</li>
            <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('team')}}>TEAM</li>
            {/* <Link href="/yearbook">
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('yearbook')}}>YEARBOOK</li>
            </Link> */}
            <Link href="/orientation">
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300' onClick={() => {settrigger(true); setbuttonPressed('orientation')}}>ORIENTATION</li>
            </Link>
        </ul>
        
              {/* https://docs.google.com/forms/d/e/1FAIpQLSdaVfS-6eW2Ny6I57CvYMWO7GwKoNhDRfkci2bWZMeFbmjDvA/viewform */}

        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdaVfS-6eW2Ny6I57CvYMWO7GwKoNhDRfkci2bWZMeFbmjDvA/viewform" target="_blank">
              <button className='hidden md:block listItem'>
            
                  <GradientText
                  colors={["#1cd30c", "#E6FF00", "#1cd30c", "#E6FF00", "#1cd30c"]}
                  animationSpeed={8}
                  showBorder={true}
                  className="custom-class"
                  >
                  JOIN US
                  </GradientText>

              </button>
        </a>

        {/* Hamburger Button (only shown when sidebar is closed) */}
          <button
            className='md:hidden'
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="max-[480px]:size-8 size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        

        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-[98.6vh] glassmorphism p-10 pt-3 transition-transform duration-500 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[120%]'} md:hidden flex flex-col gap-5 items-end`}
        >

          {/* Close Button */}
          <button onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="relative max-[480px]:-right-5 -right-6 max-[480px]:size-8 size-10 mb-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className='flex flex-col gap-8 max-[480px]:text-base text-lg sm:text-xl'>
            <ul className='flex flex-col gap-5 items-start'>
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                onClick={() => { settrigger(true); setbuttonPressed('home'); setIsSidebarOpen(false); }}>
                HOME
              </li>
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                onClick={() => { settrigger(true); setbuttonPressed('aboutUs'); setIsSidebarOpen(false); }}>
                ABOUT US
              </li>
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                onClick={() => { settrigger(true); setbuttonPressed('events'); setIsSidebarOpen(false); }}>
                EVENTS
              </li>
              <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                onClick={() => { settrigger(true); setbuttonPressed('team'); setIsSidebarOpen(false); }}>
                TEAM
              </li>
              {/* <Link href="/yearbook">
                <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                  onClick={() => { settrigger(true); setbuttonPressed('yearbook'); setIsSidebarOpen(false); }}>
                  YEARBOOK
                </li>
              </Link> */}
              <Link href="/orientation">
                <li className='hover:text-[#1cd30c] hover:cursor-pointer transition duration-300'
                  onClick={() => { settrigger(true); setbuttonPressed('orientation'); setIsSidebarOpen(false); }}>
                  ORIENTATION
                </li>
              </Link>
            </ul>

            {/* Join Button */}
            <button>
              <GradientText
                colors={["#1cd30c", "#E6FF00", "#1cd30c", "#E6FF00", "#1cd30c"]}
                animationSpeed={8}
                showBorder={true}
                className="custom-class"
              >
                JOIN US
              </GradientText>
            </button>
          </div>
        </div>

        
    </nav>

    

  )
}
