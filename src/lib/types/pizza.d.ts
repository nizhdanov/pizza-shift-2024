interface Pizza {
  id: string;
  name: string;
  ingredients: PizzaIngredient[];
  toppings: PizzaIngredient[];
  description: string;
  sizes: PizzaSize[];
  doughs: PizzaDough[];
  calories: number;
  protein: string;
  totalFat: string;
  carbohydrates: string;
  sodium: string;
  allergens: string[];
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isNew: boolean;
  isHit: boolean;
  img: string;
}

interface PizzaIngredient {
  name:
    | 'PINEAPPLE'
    | 'MOZZARELLA'
    | 'PEPERONI'
    | 'GREEN_PEPPER'
    | 'MUSHROOMS'
    | 'BASIL'
    | 'CHEDDAR'
    | 'PARMESAN'
    | 'FETA'
    | 'HAM'
    | 'PICKLE'
    | 'TOMATO'
    | 'BACON'
    | 'ONION'
    | 'CHILE'
    | 'SHRIMPS'
    | 'CHICKEN_FILLET'
    | 'MEATBALLS';
  cost: number;
  img: string;
}

interface PizzaSize {
  name: 'SMALL' | 'MEDIUM' | 'LARGE';
  price: number;
}

interface PizzaDough {
  name: 'THIN' | 'THICK';
  price: number;
}

interface CartPizza {
  id: string;
  name: string;
  toppings: PizzaIngredient[];
  description: string;
  size: PizzaSize;
  doughs: PizzaDough;
}
