<template>
  <div v-if="!active" class="flex-1 h-20">
    <button
      disabled
      class="text-center block mx-4 my-4 h-12 w-48 block bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 rounded disabled:opacity-50"
    >
      Customize
    </button>
  </div>
  <div v-else class="flex-1">
    <button
      class="text-center block mx-4 my-4 h-12 w-48 block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-600 rounded"
      @click="onClick"
    >
      Customize
    </button>
    <TransitionRoot as="template" :show="formOpen">
      <Dialog as="div" class="relative z-10" @close="formOpen = false">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="md:pl-72 h-full">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <ImagerSettingsForm :on-cancel="onCancel" />
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useImagerStore } from "../../stores/imager";
import { Dialog, TransitionChild, TransitionRoot } from "@headlessui/vue";
import ImagerSettingsForm from "@/components/forms/ImagerSettingsForm.vue";

const store = useImagerStore();

const formOpen = ref(false);
const active = computed(() => store.currentStepIdx === 1);

function onCancel() {
  formOpen.value = false;
}

function onClick() {
  formOpen.value = true;
}
</script>
