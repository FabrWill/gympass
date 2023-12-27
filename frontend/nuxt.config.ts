// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "BairesDev | Gympass",
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      googleMapsApiUrl: process.env.GOOGLE_MAPS_API_URL,
      apiURL: process.env.API_URL,
    },
  },
  modules: ["nuxt-mdi", "@pinia/nuxt", "@nuxt/ui"],
});
