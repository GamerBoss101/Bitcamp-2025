"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as rdd from "react-device-detect";

interface DeviceContextProps {
    isSafari: boolean;
    isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSafari, setIsSafari] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        setIsSafari(rdd.isSafari);
        setIsMobile(rdd.isMobile);
    }, []);

    return (
        <DeviceContext.Provider value={{ isSafari, isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = (): DeviceContextProps => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDevice must be used within a DeviceProvider");
    }
    return context;
};