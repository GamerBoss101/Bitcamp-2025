"use client";

import React from "react";
import { Navigation } from "@skeletonlabs/skeleton-react";
import {
    Folder as IconFolder,
    Image as IconImage,
    Music as IconMusic,
    Video as IconVideo,
} from "lucide-react";

import { useRouter } from "next/navigation";

const Footer = () => {
    return (
        <div className="p-4 flex flex-col items-center gap-4 bg-surface-900">
            <Navigation.Bar className="flex justify-around w-full">
                <Navigation.Tile label="Files" href="#/files" className="flex flex-col items-center">
                    <IconFolder />
                </Navigation.Tile>
                <Navigation.Tile label="Images" href="#/images" className="flex flex-col items-center">
                    <IconImage />
                </Navigation.Tile>
                <Navigation.Tile label="Music" href="#/music" className="flex flex-col items-center">
                    <IconMusic />
                </Navigation.Tile>
                <Navigation.Tile label="Videos" href="#/videos" className="flex flex-col items-center">
                    <IconVideo />
                </Navigation.Tile>
            </Navigation.Bar>
        </div>
    );
};

export default Footer;
