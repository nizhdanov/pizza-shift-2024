import { createAppSlice } from '../redux';

import { selectPizzaCatalogResult } from './pizza';

const initialState: SelectedPizza = {
  pizzaId: undefined as unknown as string,
  size: {} as PizzaSize,
  doughs: {} as PizzaDough,
  toppings: [] as PizzaIngredient[],
  uid: undefined
};

export const selectedItemSlice = createAppSlice({
  name: 'selectedItem',
  initialState,
  selectors: {
    selectUid: (state) => state.uid,
    selectPizzaId: (state) => state.pizzaId,
    selectSize: (state) => state.size,
    selectDoughs: (state) => state.doughs,
    selectToppings: (state) => state.toppings
  },

  reducers: (create) => {
    return {
      choosePizza: create.asyncThunk<Pizza, string>(
        (id, thunkApi) => {
          const state = thunkApi.getState() as RootState;
          const pizza = selectPizzaCatalogResult(state);
          return pizza?.data?.catalog.find((pizza) => pizza.id === id) as Pizza;
        },
        {
          fulfilled: (state, action) => {
            state.pizzaId = action.payload.id;
            state.doughs = action.payload.doughs[0];
            state.size = action.payload.sizes[1];
          }
        }
      ),

      chooseCartPizza: create.asyncThunk<CartItem, string>(
        (uid, thunkApi) => {
          const state = thunkApi.getState() as RootState;

          const item = JSON.parse(JSON.stringify(state.cart.find((item) => item.uid === uid)));
          return item as CartItem;
        },
        {
          fulfilled: (state, { payload }) => {
            state.uid = payload.uid;
            state.pizzaId = payload.pizzaId;
            state.doughs = payload.doughs;
            state.size = payload.size;
            state.toppings = payload.toppings;
          }
        }
      ),

      chooseSize: create.reducer<PizzaSize>((state, { payload }) => {
        state.size = payload;
      }),

      chooseDough: create.reducer<PizzaDough>((state, { payload }) => {
        state.doughs = payload;
      }),

      chooseTopping: create.reducer<PizzaIngredient>((state, { payload }) => {
        if (state.toppings.map((topping) => topping.name).includes(payload.name)) {
          state.toppings = state.toppings.filter((topping) => topping.name !== payload.name);
        } else {
          state.toppings.push(payload);
        }
      }),

      clear: create.reducer(() => initialState)
    };
  }
});

export const { selectDoughs, selectSize, selectToppings, selectPizzaId, selectUid } =
  selectedItemSlice.selectors;

export const { choosePizza, chooseCartPizza, chooseDough, chooseSize, chooseTopping, clear } =
  selectedItemSlice.actions;
