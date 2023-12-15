// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "BairesDev | Gympass",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-mdi", "@pinia/nuxt"],
});
