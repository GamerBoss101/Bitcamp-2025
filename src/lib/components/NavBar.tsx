"use client";

import React from "react";

import Image from "next/image";
import { useDevice } from "../context/DeviceContext";

const NavBar = () => {
	const { isAuthenticated } = useDevice();

	return (
		<nav className="sticky top-0 z-50 shadow-xl text-black dark:text-white bg-surface-800">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
					<h1 className="text-xl font-semibold">
						<a href="/" className="flex items-center gap-2">
							<Image
								src="/cappylogosmall.png"
								alt="Drink Happy Logo"
								width={60}
								height={60}
								className="mr-2"
							/>

							<span>Drink Happy</span>
						</a>
					</h1>
					<div className="hidden md:flex items-center gap-4 justify-center">
						<a href="/guide" className="btn variant-ghost">
							Guide
						</a>
					</div>
					<div className="justify-self-end">
						{isAuthenticated ? (
							<div>
								<button type="button" className="btn bg-surface-500">
									<a href="/auth/logout">Logout</a>
								</button>
							</div>
						) : (
							<div className="flex gap-4">
								<button type="button" className="btn bg-surface-500">
									<a href="/auth/login?screen_hint=signup">Sign up</a>
								</button>
								<button type="button" className="btn bg-surface-500">
									<a href="/auth/login?screen_hint=login">Log in</a>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
