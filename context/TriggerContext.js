'use client'
import { createContext, useState, useContext, useRef } from "react"
import React from 'react'

const TriggerContext = createContext();

export const useTrigger = () => useContext(TriggerContext);

export const TriggerProvider = ({children}) => {

    const [trigger, settrigger] = useState(false);
    const [buttonPressed, setbuttonPressed] = useState('');
    const navBarRef = useRef();

    return (

        <TriggerContext.Provider value={{trigger, settrigger,buttonPressed, setbuttonPressed, navBarRef}}>
            {children}
        </TriggerContext.Provider> 

    );

};


