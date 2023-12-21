interface CardDTO {
  number: string;
  name: string;
  expiration_date: string;
  cvv: string;
}

interface PaymentDTO {
  value?: number;
  installments: number;
  type: 'credit | debit';
}

export default interface CreditCardDTO {
  card: CardDTO;
  payment: PaymentDTO;
}

export interface InnpayCreditCardTransactionDTO {
  reference: string;
  transactions?: { card: CardDTO; payment: PaymentDTO }[];
}
