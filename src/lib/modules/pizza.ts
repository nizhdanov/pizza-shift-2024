import { baseApi } from '../redux';

export const pizzaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPizzaCatalog: build.query<PizzaCatalogResponse, void>({
      query: () => ({
        url: 'pizza/catalog',
        method: 'GET'
      })
    }),
    postPizzaPayment: build.mutation<PizzaPaymentResponse, PizzaPaymentDto>({
      query: (dto) => ({
        url: 'pizza/payment',
        method: 'POST',
        data: dto
      })
    }),
    getPizzaOrders: build.query<PizzaCatalogResponse, void>({
      query: () => ({
        url: 'pizza/orders',
        method: 'GET'
      })
    }),
    getPizzaOrderById: build.query<PizzaCatalogResponse, string>({
      query: (orderId) => ({
        url: `pizza/orders/${orderId}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPizzaCatalogQuery, usePostPizzaPaymentMutation } = pizzaApi;

export const useGetPizzaByIdResult = (pizzaId: string) =>
  useGetPizzaCatalogQuery(undefined, {
    selectFromResult: ({ data }) => ({
      pizza: data?.catalog.find((pizza) => pizza.id === pizzaId)
    })
  });

export const selectPizzaCatalogResult = pizzaApi.endpoints.getPizzaCatalog.select();
