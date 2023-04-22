<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Form
              v-slot="{ meta }"
              :validation-schema="schema"
              :initial-values="initialValues"
              @submit="onSubmit"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-2xl"
              >
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <Cog6ToothIcon
                        class="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div class="border-b border-gray-900/10 pb-12">
                        <DialogTitle
                          as="h2"
                          class="text-base font-semibold leading-7 text-gray-900"
                          >Advanced Settings
                        </DialogTitle>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          Advanced settings are used for dev and on-prem
                          installations.
                        </p>
                        <div
                          class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                        >
                          <div class="sm:col-span-6">
                            <label
                              for="apiUrl"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >PrintNanny API URL</label
                            >
                            <div class="mt-2">
                              <Field
                                name="apiUrl"
                                type="text"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <error-message
                                class="text-red-500"
                                name="apiUrl"
                              ></error-message>
                            </div>
                          </div>
                          <!--
                        <div class="sm:col-span-3">
                          <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Last name</label
                          >
                          <div class="mt-2">
                            <input
                              id="last-name"
                              type="text"
                              name="last-name"
                              autocomplete="family-name"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-4">
                          <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Email address</label
                          >
                          <div class="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autocomplete="email"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label
                            for="country"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Country</label
                          >
                          <div class="mt-2">
                            <select
                              id="country"
                              name="country"
                              autocomplete="country-name"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Street address</label
                          >
                          <div class="mt-2">
                            <input
                              id="street-address"
                              type="text"
                              name="street-address"
                              autocomplete="street-address"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2 sm:col-start-1">
                          <label
                            for="city"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >City</label
                          >
                          <div class="mt-2">
                            <input
                              id="city"
                              type="text"
                              name="city"
                              autocomplete="address-level2"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2">
                          <label
                            for="region"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >State / Province</label
                          >
                          <div class="mt-2">
                            <input
                              id="region"
                              type="text"
                              name="region"
                              autocomplete="address-level1"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2">
                          <label
                            for="postal-code"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >ZIP / Postal code</label
                          >
                          <div class="mt-2">
                            <input
                              id="postal-code"
                              type="text"
                              name="postal-code"
                              autocomplete="postal-code"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        --></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="submit"
                    :disabled="!meta.valid"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Save
                  </button>

                  <button
                    ref="cancelButtonRef"
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="onClose"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </Form>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Field, ErrorMessage, Form } from "vee-validate";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import * as yup from "yup";

const open = ref(true);
const router = useRouter();

// define a validation schema
const schema = yup.object({
  apiUrl: yup.string().required(),
});

const initialValues = {
  apiUrl: import.meta.env.VITE_PRINTNANNY_API_URL,
};

function onClose(_close: boolean) {
  open.value = false;
  router.replace({ name: "Dashboard" });
}

async function onSubmit(_values: any) {
  open.value = false;
}
</script>
