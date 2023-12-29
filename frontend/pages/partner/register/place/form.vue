<template>
  <layout-view>
    <div class="flex flex-row">
      <div class="flex-1">
        <partner-service-view :marker="form" />
      </div>

      <div class="flex-1">
        <UTable :columns="columns" :rows="form.products">
          <template #actions-header="{ row }">
            <UButton color="gray" variant="ghost" @click="addANewService">
              <MdiIcon icon="mdiPlus" />
            </UButton>
          </template>

          <template #description-data="{ row }">
            <UInput v-model="row.description" :disabled="!row.editing" />
          </template>

          <template #price-data="{ row }">
            <UInput
              v-model="row.price"
              :disabled="!row.editing"
              type="number"
            />
          </template>

          <template #partner_price-data="{ row }">
            <UInput
              v-model="row.partner_price"
              :disabled="!row.editing"
              type="number"
            />
          </template>

          <template #actions-data="{ row }">
            <UButton color="gray" variant="ghost" v-if="!row.editing">
              <MdiIcon icon="mdiPencil" />
            </UButton>
            <UButton color="gray" variant="ghost" v-if="!row.editing">
              <MdiIcon icon="mdiTrashCan" />
            </UButton>
            <UButton color="gray" variant="ghost" v-if="row.editing">
              <MdiIcon icon="mdiCheck" />
            </UButton>
          </template>
        </UTable>
      </div>
    </div>
  </layout-view>
</template>

<script setup lang="ts">
import { usePartnerPlaceRegister } from "./partner_place_register.composable";

const columns = [
  {
    key: "description",
    label: "Name",
  },
  {
    key: "price",
    label: "Default Price",
  },
  {
    key: "partner_price",
    label: "Partner Price",
  },
  {
    key: "actions",
    label: "",
  },
];

const { form } = usePartnerPlaceRegister();

const addANewService = () => {
  form.products.push({
    id: form.products.length + 1,
    description: "",
    price: 0,
    partner_price: 0,
    editing: true,
  });
};
</script>
