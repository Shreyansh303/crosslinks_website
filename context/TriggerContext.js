'use client'
import { createContext, useState, useContext } from "react"
import React from 'react'

const TriggerContext = createContext();

export const useTrigger = () => useContext(TriggerContext);

export const TriggerProvider = ({children}) => {

    const [trigger, settrigger] = useState(false);
    const [buttonPressed, setbuttonPressed] = useState('');

    return (

        <TriggerContext.Provider value={{trigger, settrigger,buttonPressed, setbuttonPressed}}>
            {children}
        </TriggerContext.Provider> 

    );

};


