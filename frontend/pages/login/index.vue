<template>
  <div class="flex justify-center items-center h-screen p-2">
    <UForm
      class="bg-white dark:bg-gray-500 p-8 mb-4 border border-black-400 w-96 h-96 rounded-xl center justify-center space-y-4"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email" variant="outline">
        <UInput v-model="state.email" variant="outline" color="black" />
      </UFormGroup>

      <UFormGroup label="Password" name="password" variant="outline">
        <UInput
          variant="outline"
          v-model="state.password"
          type="password"
          color="black"
        />
      </UFormGroup>

      <div class="flex flex-col justify-center mt-2">
        <UButton block type="submit" color="blue"> Entrar </UButton>
        <UButton block variant="outline" color="blue" class="my-4">
          <img
            src="https://employees.bairesdev.com/assets/img/brand/Google.svg"
            class="h-5 mx-2"
          />
          Sign in with Google
        </UButton>
      </div>

      <div class="flex w-full text-right justify-end">
        <a
          class="inline-block align-baseline text-right font-light text-sm text-black hover:text-blue-500"
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

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const router = useRouter();

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const response = await useGympass("/auth/login", {
    method: "POST",
    body: state,
  });

  router.push("/dashboard");
};

onMounted(() => {});
</script>
