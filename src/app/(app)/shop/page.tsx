"use client";

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useState } from "react";


// please change names of pics below

const defaultPics = [
  "/pfps/default1.png",
  "/pfps/default2.png",
  "/pfps/default3.png",
  "/pfps/default4.png",
];

const purchasablePics = [
  { src: "/pfps/pic1.png", price: 250 },
  { src: "/pfps/pic2.png", price: 250 },
  { src: "/pfps/pic3.png", price: 2000 },
  { src: "/pfps/pic4.png", price: 2000 },
  { src: "/pfps/pic5.png", price: 2000 },
  { src: "/pfps/pic6.png", price: 2000 },
  { src: "/pfps/pic11.png", price: 2000 },
  { src: "/pfps/pic12.png", price: 2000 },
  { src: "/pfps/pic7.png", price: 10000 },
  { src: "/pfps/pic8.png", price: 10000 },
  { src: "/pfps/pic9.png", price: 10000 },
  { src: "/pfps/pic10.png", price: 10000 },
];

export default function ShopPage() {
  const { isAuthenticated, session } = useDevice();
  const [totalPoints, setTotalPoints] = useState(0); // placeholder PLEASE PUT SMTH HERE
  const [ownedPics, setOwnedPics] = useState<string[]>([...defaultPics]);
  const [currentPic, setCurrentPic] = useState(defaultPics[0]);

  const handlePurchase = (src: string, price: number) => {
    if (ownedPics.includes(src)) return;
    if (totalPoints >= price) {
      setTotalPoints(totalPoints - price);
      setOwnedPics([...ownedPics, src]);
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <div className="px-6 py-10 max-w-full lg:max-w-4xl mx-auto font-sans text-neutral-100">
      {/* User Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-neutral-800 border border-gray-300">
          <img src={currentPic} alt="Current PFP" className="rounded-full w-full h-full object-cover" />
        </div>
        <div>
		 <div className="bg-[color:var(--color-surface-600)]/60 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
			<h1 className="text-2xl font-bold text-[color:var(--color-warning-300)]">
				{isAuthenticated ? session.username : "Username"}
			</h1>
		 </div>
        </div>
      </div>

      <div className="bg-[color:var(--color-success-600)] rounded-xl px-6 py-4 mb-8 shadow-sm">
        <h2 className="text-xl font-bold text-[color:var(--color-warning-300)] mb-1">Total Points</h2>
        <p className="text-lg">{totalPoints}</p>
      </div>


      <div className="mb-8">
	  <div className="bg-[color:var(--color-success-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[color:var(--color-warning-300)] mb-0">Default Profile Pics</h2>
	  </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {defaultPics.map((src) => (
            <img
              key={src}
              src={src}
              alt="Default PFP"
              className="rounded-xl w-full h-24 object-cover border border-gray-600"
            />
          ))}
        </div>
      </div>

      {/* Shop Grid */}
      <div>
	  <div className="bg-[color:var(--color-tertiary-600)]/90 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[color:var(--color-warning-200)] mb-0">Purchase New Profile Pics!</h2>
	  </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {purchasablePics.map((pic) => (
            <div
              key={pic.src}
              className="bg-[color:var(--color-surface-600)] rounded-lg p-3 flex flex-col items-center text-center shadow-sm"
            >
              <img
                src={pic.src}
                alt="PFP"
                className="w-24 h-24 object-cover rounded border border-gray-500 mb-2"
              />
              <p className="text-sm mb-1">{pic.price} pts</p>
              <button
                className="px-3 py-1 bg-success-600 text-sm text-white rounded hover:bg-success-700"
                onClick={() => handlePurchase(pic.src, pic.price)}
                disabled={ownedPics.includes(pic.src)}
              >
                {ownedPics.includes(pic.src) ? "Owned" : "Buy"}
              </button>
            </div>
          ))}
        </div>
      </div>

	  <div className="h-6" />
	  <div className="h-6" />
	  <div className="h-6" />
	  <div className="h-6" />
	  <div className="h-6" />

    </div>
  );
}
