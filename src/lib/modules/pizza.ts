import { api } from '@modules/api';

interface PizzaCatalogResponse extends BaseResponse {
  catalog: Pizza[];
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

export const { useGetPizzaCatalogQuery } = pizzaApi;
