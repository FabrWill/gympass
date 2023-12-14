<template>
  <nav class="flex justify-between items-center bg-slate-100 text-black p-4">
    <div class="flex items-center">
      <img
        src="https://employees.bairesdev.com/assets/img/Logo.png"
        alt="Logo 1"
        class="leading-5 ml-8"
      />

      <div class="mx-8 w-0 border-r border-gray-700 h-7" />

      <span class="tracking-widest leading-5 uppercase font-semibold"
        >GYMPASS</span
      >
    </div>

    <div class="relative flex row">
      <span class="mr-4">William Fabre</span>

      <MdiIcon icon="mdiAccount" @click="toggleMenu" />

      <div
        v-if="menuAberto"
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
      >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >Sair</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const menuAberto = ref(false);

const toggleMenu = (): void => {
  menuAberto.value = !menuAberto.value;
};

const logout = (): void => {
  alert("Logout realizado!");
  menuAberto.value = false;
};
</script>
