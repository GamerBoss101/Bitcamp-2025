"use client";

import React from "react";

const NavBar = () => {
	return (
		<nav className="sticky top-0 z-50 shadow-xl text-black dark:text-white bg-surface-800">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
					<h1 className="text-xl font-semibold">
						<a href="/">Drink Happy</a>
					</h1>
					<div className="hidden md:flex items-center gap-4 justify-center">
						<a href="/info" className="btn variant-ghost">
							Info
						</a>
						<a href="/pointsguide" className="btn variant-ghost">
							Points Guide
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
