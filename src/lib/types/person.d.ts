interface ReceiverAddress {
  street: string;
  house: string;
  apartment: string;
  comment?: string;
}

interface PersonAddress extends ReceiverAddress {
  value: string;
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
