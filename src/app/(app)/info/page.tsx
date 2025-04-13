"use client";

export default function InfoPage() {
	return (
		<div className="px-6 py-10 max-w-3xl mx-auto font-sans text-neutral-100">
			<h1 className="text-3xl font-bold mb-4 text-[color:var(--color-warning-300)]">
				Beverage Consumption Info!
			</h1>
			<p className="mb-6 text-neutral-300">
				Learn what's best for your body and how to earn points and win! Making
				informed drink choices supports hydration, energy regulation, and
				overall health. Below are basic guidelines based on established public
				health recommendations.
			</p>

			<div className="bg-[color:var(--color-surface-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-2xl font-semibold mt-0 mb-2 text-[color:var(--color-warning-300)]">
					Water
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>
						The recommended daily fluid intake is approximately 2.7 liters for
						women and 3.7 liters for men. This app suggest at least 100oz per
						day!
					</li>
					<li>Water contains no calories, sugar, or caffeine.</li>
					<li>Helps with focus, digestion, and temperature regulation.</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-surface-300)] mt-1">
					Carry a refillable water bottle to stay hydrated. Drinking water will
					earn you the most points!
				</p>
			</div>

			<div className="bg-[color:var(--color-success-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-2xl font-semibold mt-0 mb-2 text-[color:var(--color-warning-200)]">
					Caffeine
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>
						The maximum recommended daily caffeine intake for most healthy
						adults is 400 mg.
					</li>
					<li>
						Excessive caffeine consumption can cause elevated heart rate,
						insomnia, anxiety, and headaches.
					</li>
					<li>
						Caffeine content in common drinks:
						<ul className="list-disc pl-5 mt-1 space-y-1">
							<li> Celsius (can): 200–270 mg </li>
							<li> Brewed coffee (8 oz): ~95 mg</li>
							<li>Coca-Cola (12 oz): ~34 mg</li>
							<li>Bottle of Mountain Dew: 91-98 mg</li>
						</ul>
					</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-surface-700)] mt-1">
					Exceeding the 400 mg daily limit will result in no points awarded for
					additional caffeinated drinks that day!
				</p>
			</div>

			<div className="bg-[color:var(--color-surface-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-2xl font-semibold mt-0 mb-2 text-[color:var(--color-warning-300)]">
					Added Sugar Drinks
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>
						The American Heart Association recommends limiting added sugar
						intake to 25 grams per day for women and 36 grams per day for men
					</li>
					<li>
						High sugar intake is associated with increased risk of obesity,
						diabetes, and heart disease!
					</li>
					<li>
						Added sugar is commonly found in sodas, energy drinks, sweetened
						teas, and flavored waters.
					</li>
					<li>
						Sugar content in common drinks:
						<ul className="list-disc pl-5 mt-1 space-y-1">
							<li> Monster Energy (16 oz): 54g </li>
							<li> Bottled sweet tea: 25–30g</li>
							<li>Vitaminwater (20 oz): 27g</li>
							<li>Coca-Cola (12 oz): 39g</li>
						</ul>
					</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-surface-300)] mt-1">
					Surpassing the daily sugar limit will result in zero points awarded
					for any further drink entries for that day!
				</p>
			</div>

			<div className="bg-[color:var(--color-success-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-2xl font-semibold mt-0 mb-2 text-[color:var(--color-warning-300)]">
					Juice and Flavored Drinks
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>
						100% fruit juice contains essential vitamins but also high amounts
						of natural sugar and lacks dietary fiber.
					</li>
					<li>
						Many flavored drinks marketed as “healthy” contain significant added
						sugar.
					</li>
					<li>
						Look for “unsweetened” or “no added sugar” labels to minimize sugar
						intake! Whole fruits are preferable over fruit juice!
					</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-surface-700)] mt-1">
					These drinks still count to the daily sugar intake but you’ll earn
					more points with juice than most other drinks!
				</p>
			</div>

			<div className="bg-[color:var(--color-surface-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-2xl font-semibold mt-0 mb-2 text-[color:var(--color-warning-300)]">
					Milk and Milk Alternatives
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>
						Dairy and fortified plant-based milks (such as almond, soy, or oat)
						provide calcium, vitamin D, and protein!
					</li>
					<li>Choose unsweetened, low-fat, or fat-free options!</li>
					<li>
						Flavored varieties (ex. chocolate or vanilla) often contain added
						sugars and should be consumed in moderation.
					</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-surface-300)] mt-1">
					Unsweetened/regular milk or milk alternatives can allow you to gain
					more points!
				</p>
			</div>

			<div className="h-6" />
			<div className="h-6" />
		</div>
	);
}
