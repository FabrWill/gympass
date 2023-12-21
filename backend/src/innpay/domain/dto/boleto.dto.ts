export class BoletoPayerDTO {
  type: number;
  number: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  neighborhood: string;
  state_letter: string;
  phone: string;
}

class InterestDTO {
  type: number;
  percentage: number;
  value: number;
}

class FineDTO {
  type: number;
  date?: string;
  percentage: number;
  value: number;
}

class DiscountDTO {
  type: number;
  expiration_date?: string;
  value: number;
  percentage: number;
}

export class BoletoConfigDTO {
  download: boolean;
  all: boolean;
  agreement_number: number;
  wallet_number: number;
  wallet_variation_number: number;
  mode_code: number;
  code_of_type_title: number;
  partial_receipt: string;
}

export class BoletoDTO extends BoletoConfigDTO {
  issue_date: string;
  due_date: string;
  tax_amount: number;
  original_value: number;
  quantity_of_protest_day?: number;
  accept_code: string;
  description_of_type_title: string;
  customer_title_number: string;
  beneficiary_title_number: string;
  qrCodePix?: string;
  occurrence_message?: string;
  payer: BoletoPayerDTO;
  interest: InterestDTO;
  fine: FineDTO;
  discount: DiscountDTO;
}
