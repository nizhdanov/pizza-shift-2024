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

interface DebitCard {
  pan: string;
  expireDate: string;
  cvv: string;
}

// App types

interface Address extends ReceiverAddress {
  value: string;
  city: string;
}

type AddressSuggestion = PostAddressSuggestionsResponse['suggestions'][0];

interface PersonalData extends Person {
  email: string;
}
