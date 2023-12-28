<template>
  <div class="w-full grid-cols-3 gap-2 grid my-4">
    <partner-service-card
      v-for="service in selectedServices"
      :brand="service.brand"
      :name="service.name"
      :key="service.id"
    />

    <partner-service-add-button />
  </div>
</template>

<script lang="ts" setup>
interface Service {
  id: number;
  name: string;
  brand: string;
}

const selectedServices: Service[] = [
  {
    name: "Calm",
    brand: "https://www.calm.com/_n/images/calm-logo-gradient.png",
    id: 1,
  },
  {
    name: "Headspace",
    brand:
      "https://images.ctfassets.net/v3n26e09qg2r/7CSyedyArzTd5GP9LiuL78/f5a303f777ee3691a8ddfd5d36a7d591/headspace-logo.svg",
    id: 2,
  },
  {
    name: "Smartfit",
    brand:
      "https://smart-site-assets-production.s3.amazonaws.com/assets/new-home-v4-assets/logo-dark.svg",
    id: 3,
  },
];
</script>
