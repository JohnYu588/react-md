export interface Dessert {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  sodium: number;
  calcium: number;
  iron: number;
  type: "Ice cream" | "Pastry" | "Other";
}

export type DessertKey = keyof Dessert;

export const desserts: readonly Dessert[] = [
  {
    name: "Frozen yogurt",
    type: "Ice cream",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: 14,
    iron: 1,
  },
  {
    name: "Ice cream sandwich",
    type: "Ice cream",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: 8,
    iron: 1,
  },
  {
    name: "Eclair",
    type: "Pastry",
    calories: 262,
    fat: 16.0,
    carbs: 37,
    protein: 6.0,
    sodium: 337,
    calcium: 6,
    iron: 7,
  },
  {
    name: "Cupcake",
    type: "Pastry",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: 3,
    iron: 8,
  },
  {
    name: "Gingerbread",
    type: "Pastry",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: 7,
    iron: 16,
  },
  {
    name: "Jelly bean",
    type: "Other",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: 0,
    iron: 0,
  },
  {
    name: "Lollipop",
    type: "Other",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
    sodium: 38,
    calcium: 0,
    iron: 2,
  },
  {
    name: "Honeycomb",
    type: "Other",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: 0,
    iron: 45,
  },
  {
    name: "Donut",
    type: "Pastry",
    calories: 52,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: 2,
    iron: 22,
  },
  {
    name: "KitKat",
    type: "Other",
    calories: 16,
    fat: 6.0,
    carbs: 65,
    protein: 7.0,
    sodium: 54,
    calcium: 12,
    iron: 6,
  },
];

export const dessertColumns = Object.keys(desserts[0]) as readonly DessertKey[];
