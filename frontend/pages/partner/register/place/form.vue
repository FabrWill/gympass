<template>
  <layout-view>
    <UProgress animation="carousel" v-show="loading" />

    <layout-title title="Register">
      <u-button color="blue" variant="solid" size="xl" class="ml-auto" trailing>
        <span class="font-sans font-medium" @click="save">Save</span>
        <mdi-icon icon="mdiContentSave" class="ml-2" />
      </u-button>
    </layout-title>

    <div class="flex flex-row">
      <div class="flex-1 p-6" style="max-width: 28vw">
        <UFormGroup label="Title">
          <u-input
            variant="outline"
            v-model="form.name"
            size="xl"
            class="py-6"
            required
          />
        </UFormGroup>

        <UFormGroup label="Image">
          <layout-image-handler v-model="form.image" class="py-6" />
        </UFormGroup>

        <UFormGroup label="Rating">
          <star-rating v-model="form.rating" class="py-6" />
        </UFormGroup>

        <UFormGroup label="Address">
          <u-input
            class="py-6"
            variant="outline"
            v-model="form.vicinity"
            size="xl"
            placeholder=""
          />
        </UFormGroup>
      </div>

      <div class="flex-1 p-6">
        <h2 class="text-lg font-light font-serif text-gray-800">
          Partner Services
        </h2>

        <u-table :columns="columns" :rows="form.products">
          <template #actions-header="{ row }">
            <u-button color="gray" variant="ghost" @click="addANewService">
              <mdi-icon icon="mdiPlus" />
            </u-button>
          </template>

          <template #description-data="{ row }">
            <u-input
              :variant="row.editing ? `outline` : `none`"
              v-model="row.description"
              :disabled="!row.editing"
              size="xl"
            />
          </template>

          <template #price-data="{ row }">
            <u-input
              :variant="row.editing ? `outline` : `none`"
              v-model="row.price"
              :disabled="!row.editing"
              size="xl"
              type="number"
              placeholder="0,00 $"
            />
          </template>

          <template #partner_price-data="{ row }">
            <u-input
              :variant="row.editing ? `outline` : `none`"
              v-model="row.partner_price"
              :disabled="!row.editing"
              size="xl"
              type="number"
              placeholder="0,00 $"
            />
          </template>

          <template #actions-data="{ row }">
            <u-button color="gray" variant="ghost" v-if="!row.editing">
              <mdi-icon icon="mdiPencil" @click="toogleEdit(row)" />
            </u-button>
            <u-button color="gray" variant="ghost" v-if="!row.editing">
              <mdi-icon icon="mdiTrashCan" @click="removeItem(row)" />
            </u-button>
            <u-button color="gray" variant="ghost" v-if="row.editing">
              <mdi-icon icon="mdiCheck" @click="toogleEdit(row)" />
            </u-button>
          </template>
        </u-table>
      </div>
    </div>
  </layout-view>
</template>

<script setup lang="ts">
import type ProductDTO from "~/components/partner/domain/dto/product.dto";
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

const { form, loading, save } = usePartnerPlaceRegister();

const addANewService = () => {
  form.products.push({
    id: form.products.length + 1,
    description: "",
    price: 0,
    partner_price: 0,
    editing: true,
  });
};

const toogleEdit = (product: ProductDTO) => {
  product.editing = !product.editing;
};

const removeItem = (product: ProductDTO) => {
  form.products = form.products.filter((p) => p.id !== product.id);
};
</script>
