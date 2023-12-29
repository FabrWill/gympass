<template>
  <layout-view>
    <layout-title title="Register"> </layout-title>
    <div class="flex flex-row">
      <div class="flex-1 p-6" style="max-width: 28vw">
        <partner-service-view :marker="form" />

        <u-form-group label="Description" name="description" variant="outline">
          <u-textarea variant="outline" v-model="form.description" />
        </u-form-group>
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
              <mdi-icon icon="mdiPencil" />
            </u-button>
            <u-button color="gray" variant="ghost" v-if="!row.editing">
              <mdi-icon icon="mdiTrashCan" />
            </u-button>
            <u-button color="gray" variant="ghost" v-if="row.editing">
              <mdi-icon icon="mdiCheck" @click="saveProductEdit(row)" />
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

const saveProductEdit = (product: ProductDTO) => {
  product.editing = false;
  console.log(product);
};
</script>
