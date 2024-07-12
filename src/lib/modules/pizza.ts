import { api } from '@modules/api';

export const pizzaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPizzaCatalog: build.query<PizzaCatalogResponse, void>({
      query: () => `pizza/catalog`
    }),
    postPizzaPayment: build.mutation<PizzaPaymentResponse, PizzaPaymentDto>({
      query: (dto) => ({
        url: `pizza/payment`,
        method: 'POST',
        body: dto
      })
    }),
    getPizzaOrders: build.query<PizzaCatalogResponse, void>({
      query: () => `pizza/orders`
    }),
    getPizzaOrderById: build.query<PizzaCatalogResponse, string>({
      query: (orderId) => `pizza/orders/${orderId}`
    })
  })
});

export const { useGetPizzaCatalogQuery, usePostPizzaPaymentMutation } = pizzaApi;
