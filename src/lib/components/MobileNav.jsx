"use client";

import React from "react";
import { Navigation } from "@skeletonlabs/skeleton-react";
import {
    Home as IconHome,
    Folder as IconFolder,
    BookText as BookImage,
    Music as IconMusic,
    Video as IconVideo,
} from "lucide-react";

import { useRouter } from "next/navigation";

const Footer = () => {
    return (
        <div className="p-4 flex flex-col items-center gap-4 bg-surface-900">
            <Navigation.Bar className="flex justify-around w-full">
                <Navigation.Tile label="Home" href="/" className="flex flex-col items-center">
                    <IconHome />
                </Navigation.Tile>
                <Navigation.Tile label="Info" href="/info" className="flex flex-col items-center">
                    <BookImage />
                </Navigation.Tile>
            </Navigation.Bar>
        </div>
    );
};

export default Footer;
