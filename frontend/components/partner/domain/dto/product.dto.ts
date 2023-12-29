export default interface ProductDTO {
  id: number;
  price: number;
  partner_price: number;
  description: string;
  editing?: boolean;
}
