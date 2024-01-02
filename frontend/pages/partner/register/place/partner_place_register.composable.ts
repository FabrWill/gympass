import PartnerPlace from "./partner_place";

const form = reactive(new PartnerPlace());
const loading = ref(false);

const selectPlace = async (place: google.maps.places.PlaceResult) => {
  const photo = place.photos ? place.photos[0] : null;
  form.fill(place);

  form.image_url = photo ? photo.getUrl({}) : "";
};

const save() = async () => {
  try {
    loading.value = true;
    

    
  } catch (error) {
    
  } finally {
    loading.value = false;
  }
}

export function usePartnerPlaceRegister() {
  return { form, selectPlace, loading };
}
