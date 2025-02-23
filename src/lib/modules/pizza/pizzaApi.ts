import { baseApi } from '@/lib/redux';
import { USER_TOKEN_KEY } from '@constants/localStorage';

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
    getPizzaOrders: build.query<PizzaOrdersResponse, void>({
      query: () => ({
        url: 'pizza/orders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
        }
      })
    }),
    getPizzaOrderById: build.query<PizzaCatalogResponse, string>({
      query: (orderId) => ({
        url: `pizza/orders/${orderId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
        }
      })
    })
  })
});

export const { useGetPizzaCatalogQuery, usePostPizzaPaymentMutation, useGetPizzaOrdersQuery } =
  pizzaApi;

export const useGetPizzaByIdResult = (pizzaId: string) =>
  useGetPizzaCatalogQuery(undefined, {
    selectFromResult: ({ data }) => ({
      pizza: data?.catalog.find((pizza) => pizza.id === pizzaId)
    })
  });

export const selectPizzaCatalogResult = pizzaApi.endpoints.getPizzaCatalog.select();
