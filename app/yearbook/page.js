'use client'
import ShinyText from '@/components/ShinyText';
import { useTrigger } from '@/context/TriggerContext'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Yearbook() {

  // Navigation
  const {trigger, settrigger,buttonPressed, setbuttonPressed} = useTrigger();
  const router = useRouter();

  useEffect(() => {
      if (trigger){ 
        if (['home', 'aboutUs', 'events', 'team'].includes(buttonPressed)) {
          router.push('/')
        } else {
          settrigger(false);
          setbuttonPressed('');
        }
      }
    }, [trigger, buttonPressed, router, settrigger, setbuttonPressed])

  return (
    // CHANGE: replaced w-screen with w-full
    <div className='w-full min-h-screen overflow-x-hidden flex justify-center items-end pb-50 sm:pb-40 md:pb-25 mask-y-from-80% mask-y-to-95% sm:mask-y-from-85% sm:mask-y-to-100% bg-[#111b15] bg-[url(/img/yearbook_mockup.png)] bg-contain bg-center bg-no-repeat'>

      <a href="https://drive.google.com/file/d/1rzMFFinZ-WJS95qDpk78mYVB5ly3TxPh/view" target='_blank'>
        <button className='downloadYearbook max-[400px]:text-base text-xl sm:text-4xl font-main font-extralight cursor-pointer border-2 
        border-[#ffffff55] px-5 py-2 mx-5 sm:px-7 sm:py-5 rounded-[10rem] z-100'>
        <ShinyText text="DOWNLOAD YEARBOOK 2025" disabled={false} speed={4} className='custom-class' />
      </button>
      </a>
      
    </div>
  )
}