<script setup lang="ts">
import { onMounted } from "vue";
import { useImagerStore } from "../../stores/imager";
import ChooseImage from "@/components/imager/ChooseImage.vue";
import CustomizeImage from "@/components/imager/CustomizeImage.vue";
import SelectDisk from "@/components/imager/SelectDisk.vue";
import FlashImage from "@/components/imager/FlashImage.vue";

import ProgressBar from "@/components/imager/ProgressBar.vue";
const store = useImagerStore();

onMounted(() => {
  store.$reset();
});

const components = [ChooseImage, SelectDisk, CustomizeImage, FlashImage];
</script>
<template>
  <!-- imager buttons -->
  <div
    class="h-full grid bg-zinc-500 items-center content-center justify-content-center space-y-4"
  >
    <nav aria-label="Progress">
      <ol role="list" class="items-center mt-6 justify-center grid grid-cols-4">
        <li
          v-for="(step, stepIdx) in store.steps"
          :key="step.name"
          :class="[
            stepIdx !== store.steps.length - 1 ? 'pr-[300px]' : '',
            'ml-[5.5rem] relative',
          ]"
        >
          <template v-if="step.complete">
            <div
              v-if="stepIdx !== store.steps.length - 1"
              class="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div class="h-0.5 w-full bg-indigo-400" />
            </div>
            <span
              class="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-400"
            >
              <component
                :is="step.solidIcon"
                class="h-16 w-16 text-white"
              ></component>
              <span class="sr-only">{{ step.name }}</span>
            </span>
          </template>
          <!--
          <template v-else-if="stepIdx == store.currentStepIdx">
            <div
              v-if="stepIdx !== store.steps.length - 1"
              class="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div class="h-0.5 w-full bg-gray-200" />
            </div>
            <span
              class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-indigo-400 bg-white"
              aria-current="step"
            >
              <component
                :is="step.solidIcon"
                class="h-16 w-16 text-indigo-400"
              ></component>
              <span class="sr-only">{{ step.name }}</span>
            </span>
          </template>
          -->
          <template v-else>
            <div
              v-if="stepIdx !== store.steps.length - 1"
              class="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div class="h-0.5 w-full bg-gray-200" />
            </div>
            <span
              class="group relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300 bg-white border-gray-400"
            >
              <component
                :is="step.solidIcon"
                class="h-16 w-16 text-gray-400"
              ></component>
              <span class="sr-only">{{ step.name }}</span>
            </span>
          </template>
        </li>
      </ol>
      <div
        class="flex items-center mt-6 justify-center ml-4 grid grid-cols-4"
      ></div>
    </nav>
    <div class="grid grid-cols-4 self-end">
      <component
        :is="components[stepIdx]"
        v-for="(_step, stepIdx) in store.steps"
        :key="stepIdx"
      ></component>
    </div>
    <ProgressBar />
  </div>
</template>
