<template>
  <div class="flex-1">
    <button
      v-if="store.steps[2].complete"
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      @click="onClick"
    >
      Customize
    </button>
    <button
      v-else
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      @click="onClick"
    >
      Customize
    </button>
    <TransitionRoot as="template" :show="formOpen">
      <Dialog as="div" class="relative z-10" @close="formOpen = false">
        <div class="fixed mt-20 ml-2 inset-2 z-10 overflow-y-auto">
          <div class="md:pl-72">
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
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all min-w-full-3/4 min-h-full p-4"
              >
                <ImagerSettingsForm :on-save="onFormSave" />
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
import { useImagerStore } from "../../stores/imager";
import {
  Dialog,
  TransitionChild,
  TransitionRoot,
  DialogPanel,
} from "@headlessui/vue";
import ImagerSettingsForm from "@/components/forms/ImagerSettingsForm.vue";

const store = useImagerStore();

const formOpen = ref(false);

function onFormSave() {
  formOpen.value = false;
  store.completeStep(2);
}

function onClick() {
  formOpen.value = true;
}
</script>
