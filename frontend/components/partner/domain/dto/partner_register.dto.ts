import type PartnerType from "../enum/partner_type.enum";
import type ProductDTO from "./product.dto";

export default interface PartnerRegisterDTO {
  name: string;
  google_place_id: string;
  latitude: number;
  longitude: number;
  image_url: string;
  type: PartnerType;
  rating: number;
  products: ProductDTO[];
}
