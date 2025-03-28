import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = [
  "Meal 1: 4 eggs, 2 slices Ezekiel bread, 1 banana, 1 scoop whey",
  "Meal 2: 6 oz chicken, 1 cup cooked rice, 1 tbsp olive oil, 1 cup green beans",
  "Meal 3: 6 oz beef/steak, 1 medium sweet potato, 1 tbsp avocado oil, 1 cup broccoli",
  "Meal 4: 1 scoop whey, 1.5 cups cooked rice, 1 tbsp nut butter, 1 apple"
];

const macros = {
  protein: 220,
  fat: 82,
  carbs: 322,
  calories: 2910,
};

const shoppingList = {
  Protein: [
    "Chicken breast: 2.6 lbs",
    "Ground beef: 2.6 lbs",
    "Ground turkey: 1.5 lbs",
    "Eggs: 28 large",
    "Whey protein: 120g",
    "Lean steak: 1.5–2 lbs"
  ],
  Carbohydrates: [
    "Basmati rice: 1.5 lbs",
    "Sweet potatoes: 2 lbs",
    "Red potatoes: 1 lb",
    "Ezekiel bread: 1 loaf",
    "Tortillas: 4–5",
    "Fruits: 8–10 total",
    "Rice cakes: 1–2 packs"
  ],
  Vegetables: [
    "Broccoli: 1.25 lbs",
    "Green beans: 1 lb",
    "Mixed veggies: 2–3 lbs",
    "Spinach or greens: 1 bag",
    "Salsa: 1 jar"
  ],
  "Fats & Oils": [
    "Olive oil: 8 tbsp",
    "Avocado oil: 6 tbsp",
    "Nut butter: 8 tbsp",
    "Guacamole: 1 small container",
    "Avocados: 2–3"
  ]
};

const recipes = [
  {
    title: "Beef & Rice Bowl",
    steps: [
      "6 oz ground beef, 1 cup rice, 1/2 cup peppers, 1 tbsp guac",
      "Cook beef and peppers, serve over rice with guac"
    ]
  },
  {
    title: "Chicken Stir-Fry",
    steps: [
      "6 oz chicken, 1 cup rice, 1 cup mixed veggies, 1 tbsp olive oil",
      "Stir-fry chicken and veggies, serve over rice"
    ]
  },
  {
    title: "Egg & Veggie Scramble",
    steps: [
      "4 eggs, 1 cup spinach, 1/4 cup peppers, 1 slice Ezekiel toast",
      "Scramble eggs with veggies, toast bread"
    ]
  }
];

export default function App() {
  const [macroLog, setMacroLog] = useState({});

  const handleMacroChange = (day, field, value) => {
    const updated = {
      ...macroLog,
      [day]: {
        ...macroLog[day],
        [field]: value,
      },
    };
    setMacroLog(updated);
    localStorage.setItem("macroLog", JSON.stringify(updated));
  };

  return (
    <div className="p-4 space-y-4 font-sans text-sm">
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Daily Macros</h2>
        <p>Calories: {macros.calories}</p>
        <p>Protein: {macros.protein}g</p>
        <p>Fat: {macros.fat}g</p>
        <p>Carbs: {macros.carbs}g</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Meal Plan</h2>
        {days.map((day) => (
          <div key={day} className="bg-white p-4 rounded border shadow-sm">
            <h3 className="font-semibold mb-1">{day}</h3>
            {meals.map((meal, idx) => (
              <p key={idx}>- {meal}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Macro Tracker</h2>
        {days.map((day) => (
          <div key={day} className="bg-white p-4 rounded border shadow-sm">
            <h3 className="font-semibold mb-2">{day}</h3>
            <input className="border p-1 rounded mb-1 w-full" placeholder="Protein (g)" value={macroLog[day]?.protein || ''} onChange={(e) => handleMacroChange(day, 'protein', e.target.value)} />
            <input className="border p-1 rounded mb-1 w-full" placeholder="Fat (g)" value={macroLog[day]?.fat || ''} onChange={(e) => handleMacroChange(day, 'fat', e.target.value)} />
            <input className="border p-1 rounded mb-1 w-full" placeholder="Carbs (g)" value={macroLog[day]?.carbs || ''} onChange={(e) => handleMacroChange(day, 'carbs', e.target.value)} />
            <input className="border p-1 rounded mb-1 w-full" placeholder="Calories" value={macroLog[day]?.calories || ''} onChange={(e) => handleMacroChange(day, 'calories', e.target.value)} />
            <input className="border p-1 rounded mb-1 w-full" placeholder="Notes" value={macroLog[day]?.notes || ''} onChange={(e) => handleMacroChange(day, 'notes', e.target.value)} />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Shopping List</h2>
        {Object.entries(shoppingList).map(([group, items]) => (
          <div key={group} className="bg-white p-4 rounded border shadow-sm">
            <h3 className="font-semibold mb-2">{group}</h3>
            <ul className="list-disc list-inside">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Recipes</h2>
        {recipes.map((recipe, idx) => (
          <div key={idx} className="bg-white p-4 rounded border shadow-sm">
            <h3 className="font-semibold mb-2">{recipe.title}</h3>
            <ul className="list-disc list-inside">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
