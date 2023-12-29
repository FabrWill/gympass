<template>
  <layout-view>
    <layout-title title="Partners List">
      <u-dropdown :items="addOptions">
        <u-button
          color="blue"
          variant="solid"
          size="xl"
          class="flex-1 ml-auto"
          trailing
        >
          <span class="font-sans font-medium">Adicionar</span>
          <mdi-icon icon="mdiPlus" class="ml-2" />
        </u-button>

        <template #item="{ item }">
          <span class="truncate pa-4 font-serif text-xl">{{ item.label }}</span>

          <mdi-icon :icon="item.icon" class="ml-auto" />
        </template>
      </u-dropdown>
    </layout-title>

    <u-table> </u-table>
  </layout-view>
</template>

<script setup lang="ts">
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types";
import PartnerType from "~/components/partner/domain/enum/partner_type.enum";

const addOptions: DropdownItem[][] = [
  [
    {
      label: "Place",
      icon: "mdiMapMarker",
      click: () => goToRegister(PartnerType.PLACE),
    },
  ],
  [
    {
      label: "Service",
      icon: "mdiWeb",
      click: () => goToRegister(PartnerType.SERVICE),
    },
  ],
];

const router = useRouter();
const goToRegister = (type: PartnerType) => {
  router.push({ name: `partner-register-${type}`.toLowerCase() });
};
</script>
