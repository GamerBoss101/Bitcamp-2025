"use client";

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

export default function PointsGuidePage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto font-sans text-neutral-100">
      <h1 className="text-3xl font-bold mb-4 text-[color:var(--color-warning-300)]"> 
        Points Guide
      </h1>
      <p className="mb-6 text-surface-300">
        Learn how many points you receive for each drink!
      </p>

    
      <ul>
						Game Points System:
						<ul className="list-disc pl-5 mt-1 space-y-1">
							<li> +15 points for drinking ≥100 oz of water </li>
							<li> +10 points for keeping caffeine &lt; 200 mg </li>
							<li> +15 points for staying under the sugar cap all day </li>
							<li> Exceeding 400mg caffeine limit or 30.5g sugar limit = 0 pts logged for those drinks </li>
						</ul>
			</ul>

        <div className="bg-[color:var(--color-surface-600)] rounded-xl px-6 py-5 my-6 shadow-sm">
        
        <div className="overflow-x-auto rounded-xl shadow border border-[color:var(--color-primary-800)]">
            <table className="min-w-full text-sm text-left text-[color:var(--color-warning-200)]">
            <caption className="caption-top p-4 text-lg font-semibold text-[color:var(--color-warning-200)]">
              Beverage Scoring System
            </caption>

        <thead className="bg-[color:var(--color-primary-100)] text-[color:var(--color-success-950)]">
        <tr>
                <th className="px-4 py-2">Drink</th>
                <th className="px-4 py-2">Volume (oz)</th>
                <th className="px-4 py-2">Caffeine (mg)</th>
                <th className="px-4 py-2">Sugar (g)</th>
                <th className="px-4 py-2">Points Earned</th>
                <th className="px-4 py-2">Bonus</th>
              </tr>
            </thead>
            <tbody className="[&>tr:hover]:bg-[color:var(--color-surface-700)]">
        {tableData.map((row, i) => (
                <tr key={i} className="border-t border-[color:var(--color-primary-200)]">
                  <td className="px-4 py-2 font-medium">{row.drink}</td>
                  <td className="px-4 py-2">{row.volume}</td>
                  <td className="px-4 py-2">{row.caffeine}</td>
                  <td className="px-4 py-2">{row.sugar}</td>
                  <td className="px-4 py-2 font-bold">{row.points}</td>
                  <td className="px-4 py-2 italic">{row.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        </div>

      <div className="h-6" /> 
      <div className="h-6" /> 
    </div>
  );
}
