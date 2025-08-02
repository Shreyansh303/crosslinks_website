'use client'
import Schedule from '@/components/Schedule';
import { Separator } from '@/components/Separator';
import { useTrigger } from '@/context/TriggerContext'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function Orientation() {

    //Navigation
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
    <div>

      <div className='flex flex-col font-main mx-auto px-4 w-full max-w-[1280px]'>

        {/* Landing */}
        <div className="title flex flex-col gap-0 sm:gap-1 items-center justify-center max-[480px]:mt-25 sm:mt-30">
          <h1 className="font-greater-theory max-[400px]:text-4xl font-light text-5xl sm:text-6xl text-[#1cd30c] text-center">ORIENTATION SCHEDULE</h1>
        </div>

        <Separator/>

        <Schedule/>

        <Separator/>

      </div>

    </div>
  )
}
