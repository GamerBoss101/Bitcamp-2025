"use client";

import { useState } from "react";
import InfoContent from "./Info";
import PointGuide from "./PointGuide";

export default function InfoPage() {
    const [activeComponent, setActiveComponent] = useState<"info" | "points">("info");

    return (
        <div className="px-6 py-10 max-w-full lg:max-w-3/4 mx-auto font-sans text-neutral-100">
            <img src="/drinkhappylogo.png" alt="Drink Happy Logo Image" className="h-auto my-4 mx-auto w-3/4 lg:w-1/3" />
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${
                        activeComponent === "info"
                            ? "bg-primary-500 text-white"
                            : "bg-secondary-700 text-gray-300"
                    }`}
                    onClick={() => setActiveComponent("info")}
                >
                    Info Content
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        activeComponent === "points"
                            ? "bg-primary-500 text-white"
                            : "bg-secondary-700 text-gray-300"
                    }`}
                    onClick={() => setActiveComponent("points")}
                >
                    Point Guide
                </button>
            </div>

            <div>
                {activeComponent === "info" && <InfoContent />}
                {activeComponent === "points" && <PointGuide />}
            </div>
        </div>
    );
}
