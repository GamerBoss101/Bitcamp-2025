"use client";

import React from "react";

const tableData = [
	{
		drink: "Water",
		volume: "8",
		caffeine: "n/a",
		sugar: "n/a",
		points: "100",
		bonus: "+15 for >=64oz in day",
	},
	{
		drink: "Coffee",
		volume: "8",
		caffeine: "95",
		sugar: "?",
		points: "50",
		bonus: "0 pts after 400mg caffeine",
	},
	{
		drink: "Earl Grey Tea",
		volume: "8",
		caffeine: "55",
		sugar: "0",
		points: "50",
		bonus: "0 pts after 400mg caffeine",
	},
	{
		drink: "Coca-Cola",
		volume: "8",
		caffeine: "34",
		sugar: "39",
		points: "0",
		bonus: "Exceeds sugar",
	},
	{
		drink: "100% Fruit Juice",
		volume: "8",
		caffeine: "0",
		sugar: "22",
		points: "50",
		bonus: "0 pts after 30.5g sugar",
	},
	{
		drink: "Dairy Milk (low-fat)",
		volume: "8",
		caffeine: "0",
		sugar: "12",
		points: "50",
		bonus: "+0.5 calcium bonus",
	},
];

const PointGuide = () => {

    return (
		<div>
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
  				Points Guide
			</h1>
			<p className="mb-6 text-sm sm:text-base text-white">
  					Learn how many points you receive for each drink!
			</p>

			<ul>
				<span className="text-base sm:text-lg">Game Points System:</span>
				<ul className="list-disc pl-5 mt-1 space-y-1 text-sm sm:text-base">
					<li> +150 points for drinking ≥100 oz of water </li>
					<li> +100 points for keeping caffeine &lt; 200 mg </li>
					<li> +150 points for staying under the sugar cap all day </li>
					<li>
						Exceeding 400mg caffeine limit or 30.5g sugar limit = 0 pts logged for
						those drinks
					</li>
				</ul>
			</ul>

			<div className="bg-surface-700 rounded-xl px-4 py-4 my-6 shadow-sm">
				<div className="overflow-x-auto rounded-xl scroll-auto">
					<table className="min-w-full text-xs sm:text-sm text-left text-[color:var(--color-warning-200)]">
						<caption className="caption-top p-4 text-lg sm:text-xl font-semibold text-[color:var(--color-warning-200)]">
							Beverage Scoring System
						</caption>

						<thead className="bg-[color:var(--color-surface-200)] text-[color:var(--color-success-950)] text-center">
							<tr>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Drink</th>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Volume (oz)</th>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Caffeine (mg)</th>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Sugar (g)</th>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Points Earned</th>
								<th className="px-2 sm:px-4 py-2 whitespace-nowrap">Bonus</th>
							</tr>
						</thead>
						<tbody className="[&>tr:hover]:bg-[color:var(--color-surface-800)] text-center">
							{tableData.map((row, i) => (
								<tr
									key={i}
									className="border-t border-[color:var(--color-surface-950)]"
								>
									<td className="px-2 py-2 font-medium whitespace-nowrap">{row.drink}</td>
									<td className="px-2 py-2 whitespace-nowrap">{row.volume}</td>
									<td className="px-2 py-2 whitespace-nowrap">{row.caffeine}</td>
									<td className="px-2 py-2 whitespace-nowrap">{row.sugar}</td>
									<td className="px-2 py-2 font-bold whitespace-nowrap">{row.points}</td>
									<td className="px-2 py-2 italic whitespace-nowrap">{row.bonus}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
    );
};

export default PointGuide;
