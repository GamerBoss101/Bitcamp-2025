"use client";

import React from "react";
import { Navigation } from "@skeletonlabs/skeleton-react";
import {
    Home as IconHome,
    BookText as BookImage,
    User as UserImage,
    Plus as PlusImage,
} from "lucide-react";

import { useDevice } from "@/lib/context/DeviceContext";

const MobileNav = () => {
    const { isAuthenticated } = useDevice();

    return (
        <div className="p-4 flex flex-col items-center gap-4 bg-surface-900">
            <Navigation.Bar className="flex justify-around w-full">
                <Navigation.Tile label="Home" href="/" className="flex flex-col items-center">
                    <IconHome />
                </Navigation.Tile>
                <Navigation.Tile label="Guide" href="/guide" className="flex flex-col items-center">
                    <BookImage />
                </Navigation.Tile>
                {isAuthenticated ? (
                    <div>
                        <Navigation.Tile label="Profile" href="/posts" className="flex flex-col items-center">
                            <PlusImage />
                        </Navigation.Tile>
                        <Navigation.Tile label="Profile" href="/profile" className="flex flex-col items-center">
                                <UserImage />
                        </Navigation.Tile>
                    </div>
                ) : null}
            </Navigation.Bar>
        </div>
    );
};

export default MobileNav;
