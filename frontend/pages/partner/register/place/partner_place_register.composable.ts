import useGympass from "~/shared/http/use_gympass";
import PartnerPlace from "./partner_place";

const form = reactive(new PartnerPlace());
const loading = ref(false);

const selectPlace = async (place: google.maps.places.PlaceResult) => {
  const photo = place.photos ? place.photos[0] : null;
  form.fill(place);

  form.image_url = photo ? photo.getUrl({}) : "";
};

const save = async () => {
  try {
    loading.value = true;

    const response = await useGympass("partner/place", {
      method: "POST",
      body: form.toFormData(),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

export function usePartnerPlaceRegister() {
  return { form, selectPlace, loading, save };
}
