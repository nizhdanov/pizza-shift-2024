interface BaseResponse {
  success: boolean;
  reason?: string;
}

interface CreateOtpDto {
  phone: string;
}

interface SignInDto {
  phone: string;
  code: number;
}

interface SignInResponse extends BaseResponse {
  token: string;
  user: {
    phone: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    email?: string;
    city?: string;
  };
}

interface AuthOtpResponse extends BaseResponse {
  retryDelay: number;
}

interface PizzaCatalogResponse extends BaseResponse {
  catalog: Pizza[];
}

interface CartPizza {
  id: string;
  name: string;
  description: string;
  toppings: PizzaIngredient[];
  size: PizzaSize;
  doughs: PizzaDough;
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

interface PostAddressSuggestionsResponse {
  suggestions: {
    value: string;
    unrestricted_value: string;
    data: {
      city: string | null;
      street: string | null;
      house: string | null;
      flat: string | null;
    } & Record<string, string | null>;
  }[];
}
