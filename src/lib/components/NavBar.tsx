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

const NavBar = () => {
    return (
<nav className="sticky top-0 z-50 shadow-xl text-black dark:text-white bg-surface-800">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
            <h1 className="text-xl font-semibold"><a href="/">Drink Happy</a></h1>
            <div className="hidden md:flex items-center gap-4 justify-center">
                <a href="/#create" className="btn variant-ghost">Create</a>
                <a href="/#edit" className="btn variant-ghost">Edit</a>
            </div>
        </div>
    </div>
</nav>
    );
};

export default NavBar;
