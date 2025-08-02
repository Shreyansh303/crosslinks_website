'use client';
import { useEffect, useState } from 'react';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('/json/schedule.json')
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch((err) => console.error("Error loading schedule:", err));
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center justify-center max-[480px]:my-0 my-5">
      {schedule.map((society, index) => (
        <div key={index} className="socCard w-full flex justify-center flex-col rounded-2xl overflow-hidden border-2 border-[#ffffff55] px-8 py-3">
          <div className="info flex flex-col gap-1 md:gap-0 md:flex-row items-center justify-between">
            <h1 className='socName font-greater-theory max-[400px]:text-2xl/5 text-3xl/7 sm:text-4xl/9 pb-1 text-center md:text-left'>{society.name}</h1>
            <div className="flex justify-center items-center max-[400px]:gap-1 gap-2 sm:gap-3">
              <h2 className='socTiming font-nexa-light font-bold text-center max-[480px]:text-xs/2 text-sm/3 sm:text-base/4'>{society.date}</h2>
              <h2 className='socTiming font-nexa-light font-bold text-center max-[480px]:text-xs/2 text-sm/3 sm:text-base/4'>|</h2>
              <h2 className='socTiming font-nexa-light font-bold text-center max-[480px]:text-xs/2 text-sm/3 sm:text-base/4'>{society.venue}</h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" max-[480px]:size-3 size-4 sm:size-5 hover:cursor-pointer hover:text-[#1cd30c] transition duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
