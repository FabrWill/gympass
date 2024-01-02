import type PartnerRegisterDTO from "~/components/partner/domain/dto/partner_register.dto";
import type ProductDTO from "~/components/partner/domain/dto/product.dto";
import PartnerType from "~/components/partner/domain/enum/partner_type.enum";

export default class PartnerPlace
  implements PartnerRegisterDTO, google.maps.places.PlaceResult
{
  name = "";
  google_place_id = "";
  longitude = 0;
  latitude = 0;
  image_url = "";
  type = PartnerType.PLACE;
  rating = 0;
  products: ProductDTO[] = [];
  photos: google.maps.places.PlacePhoto[] = [];
  image: File | null = null;
  vicinity = "";
  description = "";

  fill(place: google.maps.places.PlaceResult) {
    this.name = place.name;
    this.google_place_id = place.place_id!;
    this.latitude = place.geometry!.location.lat();
    this.longitude = place.geometry!.location.lng();
    this.photos = place.photos ?? [];
    this.vicinity = place.vicinity ?? "";
    this.rating = place.rating ?? 0;
  }
}
