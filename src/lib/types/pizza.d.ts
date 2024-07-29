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

type PizzaIngredientEnum =
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

interface PizzaIngredient {
  name: PizzaIngredientEnum;
  cost: number;
  img: string;
}

type PizzaSizeEnum = 'SMALL' | 'MEDIUM' | 'LARGE';

interface PizzaSize {
  name: PizzaSizeEnum;
  price: number;
}

type PizzaDoughEnum = 'THIN' | 'THICK';

interface PizzaDough {
  name: PizzaDoughEnum;
  price: number;
}

// App types

interface SelectedPizza {
  pizzaId: string;
  size: PizzaSize;
  doughs: PizzaDough;
  toppings: PizzaIngredient[];
  uid: string | undefined;
}

interface CartItem extends SelectedPizza {
  uid: string;
  count: number;
}
