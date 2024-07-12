interface BaseResponse {
  success: boolean;
  reason?: string;
}

type PostAddressSuggestionsResponse = {
  value: string;
  unrestricted_value: string;
  data: Record<string, string | null>;
}[];

interface PizzaCatalogResponse extends BaseResponse {
  catalog: Pizza[];
}

interface PizzaPaymentDto {
  receiverAddress: ReceiverAddress;
  person: Person;
  debitCard: DebitCard;
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
