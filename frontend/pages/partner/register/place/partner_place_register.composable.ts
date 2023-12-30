import router from "nuxt/dist/pages/runtime/plugins/router";
import type PartnerRegisterDTO from "~/components/partner/domain/dto/partner_register.dto";
import PartnerType from "~/components/partner/domain/enum/partner_type.enum";

const form = reactive<PartnerRegisterDTO & google.maps.places.PlaceResult>({
  name: "",
  google_place_id: "",
  longitude: 0,
  latitude: 0,
  image_url: "",
  type: PartnerType.PLACE,
  rating: 0,
  products: [],
  photos: [],
  image: undefined,
  vicinity: "",
  description: "",
});

const selectPlace = async (place: google.maps.places.PlaceResult) => {
  const photo = place.photos ? place.photos[0] : null;
  console.log(photo);

  form.name = place.name;
  form.google_place_id = place.place_id!;
  form.latitude = place.geometry!.location.lat();
  form.longitude = place.geometry!.location.lng();
  form.photos = place.photos ?? [];
  form.image_url = photo ? photo.getUrl({}) : "";
  form.image = undefined;
  console.log(form.image_url, place.rating, JSON.parse(JSON.stringify(place)));
  form.vicinity = place.vicinity ?? "";
  form.rating = place.rating ?? 0;
};

export function usePartnerPlaceRegister() {
  return { form, selectPlace };
}
