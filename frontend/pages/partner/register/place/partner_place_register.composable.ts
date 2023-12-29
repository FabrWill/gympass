import { ref } from "vue";
import type Marker from "~/components/maps/domain/marker";

const form = reactive<any>({});

export function usePartnerPlaceRegister() {
  return { form };
}
