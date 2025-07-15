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
    <div className='w-full h-screen flex justify-center items-center'>
      <button className='downloadYearbook max-[400px]:text-base text-2xl sm:text-4xl font-main font-extralight cursor-pointer border-2 
      border-[#ffffff55] px-7 py-5 mx-2 rounded-[10rem]'>
        <ShinyText text="DOWNLOAD YEARBOOK 2025" disabled={false} speed={4} className='custom-class' />
      </button>
    </div>
  )
}
