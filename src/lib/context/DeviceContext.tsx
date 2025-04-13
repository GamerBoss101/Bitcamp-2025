"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as rdd from "react-device-detect";

interface DeviceContextProps {
    isSafari: boolean;
    isMobile: boolean;  
    session: any | null;
    isAuthenticated: boolean;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSafari, setIsSafari] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [session, setSession] = useState<any>(null);

    const isAuthenticated = !!session;

    useEffect(() => {
        setIsSafari(rdd.isSafari);
        setIsMobile(rdd.isMobile);

        const checkAuthentication = async () => {
            const res = await fetch("/auth/session");
            const data = await res.json();

            if (res.ok) setSession(data.session);
        };

        checkAuthentication();
    }, []);

    return (
        <DeviceContext.Provider value={{ isSafari, isMobile, session, isAuthenticated }}>
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