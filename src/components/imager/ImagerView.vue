<script setup lang="ts">
import { ref } from "vue";
import ChooseImage from "@/components/imager/ChooseImage.vue";

const imagerNav = [
  { name: "Choose an Image", component: ChooseImage },
  { name: "Select a Disk", component: ChooseImage },
  { name: "Customize", component: ChooseImage },
  { name: "Flash", component: ChooseImage },
];

const currentIdx = ref(0);
</script>
<template>
  <div class="grid grid-cols-3">
    <aside class="col-span-1 overflow-y-auto border-r border-gray-200">
      <!-- Secondary column (hidden on smaller screens) -->
      <div
        v-for="(item, idx) in imagerNav"
        :key="item.name"
        :class="[
          currentIdx == idx ? 'bg-gray-300' : 'bg-gray-100',
          'h-16 w-full px-4 py-6 sm:px-6 lg:px-8 leading-6 font-semibold text-sm text-gray-700 border-r border-l border-b border-gray-300 flex text-center',
        ]"
      >
        <span>{{ idx + 1 }}) </span><span class="flex-1"> {{ item.name }}</span>
      </div>
    </aside>
    <main class="col-span-2">
      <!-- Main area -->
      <component :is="imagerNav[currentIdx].component"></component>
    </main>
  </div>
</template>
