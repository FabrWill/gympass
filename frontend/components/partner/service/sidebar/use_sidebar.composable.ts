import { ref } from "vue";
import type Marker from "~/components/maps/domain/marker";

const marker = ref<Marker | null>(null);
const isOpen = ref<Boolean>(false);

function closeSidebar() {
  isOpen.value = !isOpen.value;
}

function openSidebar(newMarker: Marker) {
  isOpen.value = true;

  marker.value = newMarker;
}

export function useSidebar() {
  return { isOpen, openSidebar, closeSidebar, marker };
}
