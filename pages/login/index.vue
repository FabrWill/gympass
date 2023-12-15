<template>
  <div class="flex justify-center items-center h-screen p-2">
    <form
      class="bg-white p-8 mb-4 border border-gray-400 w-96 h-96 rounded-xl center justify-center"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          User
        </label>
        <input
          class="border focus:border-2 border-gray-400 focus:border-primary-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="border focus:border-2 border-gray-400 focus:border-primary-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <button
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold border-2 border-primary-500 w-full flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="login"
      >
        Entrar
      </button>
      <div class="flex justify-center mt-2">
        <button
          class="bg-white hover:bg-primary-200 text-black font-bold border-2 border-primary-500 w-full flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          <img
            src="https://employees.bairesdev.com/assets/img/brand/Google.svg"
            class="h-5"
          />
          Sign in with Google
        </button>
      </div>

      <div class="flex w-full text-right justify-end">
        <a
          class="inline-block align-baseline text-right font-light text-sm text-black hover:text-blue-800"
          href="#"
        >
          Change Password
        </a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const login = () => {
  router.push("/dashboard");
};
</script>
