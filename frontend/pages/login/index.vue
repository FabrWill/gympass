<template>
  <div class="flex justify-center items-center h-screen p-2">
    <UForm
      class="bg-white dark:bg-gray-500 p-8 mb-4 border border-black-400 w-96 h-96 rounded-xl center justify-center space-y-4"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <layout-input
        v-model="state.email"
        label="E-mail"
        type="email"
        placeholder="test@example.com"
      />

      <layout-input
        v-model="state.password"
        label="Password"
        type="password"
        placeholder="******************"
      />

      <div class="flex flex-col justify-center mt-2">
        <layout-button class="my-4"> Entrar </layout-button>
        <layout-button outlined>
          <img
            src="https://employees.bairesdev.com/assets/img/brand/Google.svg"
            class="h-5 mx-2"
          />
          Sign in with Google
        </layout-button>
      </div>

      <div class="flex w-full text-right justify-end">
        <a
          class="inline-block align-baseline text-right font-light text-sm text-black hover:text-blue-800"
          href="#"
        >
          Change Password
        </a>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { z } from "zod";

import useGympass from "@/shared/http/use_gympass";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const router = useRouter();
const response = useGympass("/login");

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  response.execute();
};

onMounted(() => {});
</script>
