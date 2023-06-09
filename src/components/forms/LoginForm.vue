<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import {
  LockClosedIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";
import { Field, ErrorMessage, Form } from "vee-validate";
import { useAccountStore } from "@/stores/account";
import { ref, reactive } from "vue";
import * as yup from "yup";

const account = useAccountStore();
const router = useRouter();
const loading = ref(false);
const state = reactive({
  loading,
});

// define a validation schema
const schema = yup.object({
  email: yup.string().required().email(),
});

async function onSubmit(values: Event) {
  state.loading = true;
  const res = await account.twoFactorStage1(values.email);
  if (res == true) {
    router.push({ name: "login-confirm", params: { email: values.email } });
  }
  state.loading = false;
}
</script>
<template>
  <div
    class="bg-gray-100 h-screen w-full flex flex-1 items-center justify-center"
  >
    <router-link
      :to="{ name: 'Developer Settings' }"
      class="h-8 w-8 self-end ml-2 mb-2"
    >
      <Cog6ToothIcon class="text-gray-600"></Cog6ToothIcon>
    </router-link>

    <div
      class="align-middle flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8 bg-indigo-20 md:w-1/2 m:0 md:mx-auto rounded bg-white shadow-2xl"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-30 w-auto"
            src="@/assets/logo/logo-rect-light.svg"
            alt="PrintNanny"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to PrintNanny Cloud
          </h2>
        </div>
        <Form v-slot="{ meta }" :validation-schema="schema" @submit="onSubmit">
          <label for="email" class="sr-only">Email address</label>
          <error-message class-name="text-red-500" name="email"></error-message>
          <Field
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            rules="required"
          />
          <button
            id="email-submit"
            :disabled="state.loading || !meta.valid"
            type="submit"
            class="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-25"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                v-if="!state.loading"
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
              <ArrowPathIcon
                v-if="state.loading"
                class="animate-spin h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in with Email
          </button>

          <p class="mt-2 text-center text-sm text-gray-600">
            ✨ We'll email you a magic link for password-free sign in ✨
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>
