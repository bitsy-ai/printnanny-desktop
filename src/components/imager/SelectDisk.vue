<template>
  <div class="flex-1">
    <button
      v-if="store.selectedDisk !== null"
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-600 rounded"
      @click="clearSelection"
    >
      Clear selection
    </button>
    <button
      v-else
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      @click="onClick"
    >
      {{ store.selectedDisk !== null ? `Clear selection` : "Choose Storage" }}
    </button>
    <p
      v-if="store.selectedDisk"
      class="mx-auto w-48 h-12 text-center text-stone-50 text-sm truncate"
    >
      {{ truncate(store.selectedDisk?.displayHeader(), 12) }}
    </p>
    <TransitionRoot as="template" :show="show">
      <Dialog as="div" class="relative z-10" @close="show = false">
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
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all min-w-full-3/4 min-h-full"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left space-y-6"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-lg font-medium leading-6 text-gray-900"
                        >Select a removeable storage device</DialogTitle
                      >

                      <div v-if="store.loading">
                        <CustomSpinner text="Scanning for drives..." />
                      </div>
                      <div v-else-if="store.disks.length == 0">
                        <p class="text-lg font-medium text-red-500">
                          No removable drives found.
                        </p>
                      </div>
                      <div v-else class="mt-2">
                        <ul
                          class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <li
                            v-for="disk in store.disks"
                            :key="disk.displayName"
                            class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                          >
                            <div class="flex items-center pl-3">
                              <input
                                id="list-radio-license"
                                v-model="store.selectedDisk"
                                type="radio"
                                :value="disk"
                                name="list-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                for="list-radio-license"
                                class="p-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                                ><strong> {{ disk.displayHeader() }}</strong>
                                {{ disk.displayDetail() }}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click="show = false"
                      >
                        <span class="sr-only">Dismiss</span>
                        <XCircleIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="onSelect"
                  >
                    Select
                  </button>
                  <button
                    ref="cancelButtonRef"
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="refresh"
                  >
                    Refresh
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useImagerStore } from "@/stores/imager";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import CustomSpinner from "@/components/CustomSpinner.vue";
import { truncate } from "@/utils/text";
import { error } from "../../utils/error";
const store = useImagerStore();
const show = ref(false);

async function refresh() {
  const disks = await store.listRemoveableDrives();
  if (disks.length == 0) {
    const header = "No devices found";
    const message =
      "No removable devices (USB, SD Card Reader) detected. \n Try removing and re-inserting the device.";
    error(header, message);
  }
}

function onSelect() {
  show.value = false;
  console.log("Selected target disk:", store.selectedDisk);
  store.completeStep(1);
}

async function onClick() {
  show.value = true;
  await refresh();
}

function clearSelection() {
  store.$patch({ selectedDisk: null });
  store.completeStep(1);
}
</script>
