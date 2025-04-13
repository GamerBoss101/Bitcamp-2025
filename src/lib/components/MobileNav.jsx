"use client";

import React from "react";
import { Navigation } from "@skeletonlabs/skeleton-react";
import {
    Home as IconHome,
    BookText as BookImage,
    Coins as CoinsImage,
    User as UserImage,
} from "lucide-react";

const Footer = () => {

    const { isAuthenticated } = useDevice();

    return (
        <div className="p-4 flex flex-col items-center gap-4 bg-surface-900">
            <Navigation.Bar className="flex justify-around w-full">
                <Navigation.Tile label="Home" href="/" className="flex flex-col items-center">
                    <IconHome />
                </Navigation.Tile>
                <Navigation.Tile label="Info" href="/info" className="flex flex-col items-center">
                    <BookImage />
                </Navigation.Tile>
                <Navigation.Tile label="Points Guide" href="/pointsguide" className="flex flex-col items-center">
                    <CoinsImage />
                </Navigation.Tile>
                {isAuthenticated ? (
                   <Navigation.Tile label="Profile" href="/profile" className="flex flex-col items-center">
                        <UserImage />
                    </Navigation.Tile>
                ) : null}
            </Navigation.Bar>
        </div>
    );
};

export default Footer;
