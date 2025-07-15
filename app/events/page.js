'use client'
import { useTrigger } from '@/context/TriggerContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function events() {

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
      
    }, [trigger,buttonPressed])

  return (
    <div>events</div>
  )
}
