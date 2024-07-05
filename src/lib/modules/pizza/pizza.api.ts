import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PizzaCatalogResponse extends BaseResponse {
  catalog: Pizza[];
}

interface ReceiverAddress {
  street: string;
  house: string;
  apartment: string;
  comment?: string;
}

interface Person {
  firstname: string;
  lastname: string;
  middlename?: string;
  phone: string;
}

interface PizzaPaymentDto {
  receiverAddress: ReceiverAddress;
  person: Person;
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
  pizzas: CartPizza[];
}

interface PizzaPaymentResponse extends BaseResponse {
  order: {
    receiverAddress: ReceiverAddress;
    person: Person;
    status: 0 | 1 | 2 | 3 | 4;
    cancellable: boolean;
  };
}

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://shift-backend.onrender.com/pizza/' }),
  endpoints: (build) => ({
    getPizzaCatalog: build.query<PizzaCatalogResponse, void>({
      query: () => `catalog`
    }),
    postPizzaPayment: build.mutation<PizzaPaymentResponse, PizzaPaymentDto>({
      query: (dto) => ({
        url: `payment`,
        method: 'POST',
        body: dto
      })
    }),
    getPizzaOrders: build.query<PizzaCatalogResponse, void>({
      query: () => `orders`
    }),
    getPizzaOrderById: build.query<PizzaCatalogResponse, string>({
      query: (orderId) => `orders/${orderId}`
    })
  })
});

export const { useGetPizzaCatalogQuery } = pizzaApi;
