<template>
  <div v-if="store.flashButtonEnabled" class="flex-1">
    <button
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      @click="onClick"
    >
      Flash!
    </button>
    <p class="text-center text-stone-50 text-sm truncate">
      {{ imageWriterStatus }}
    </p>
  </div>
  <div v-else class="flex-1 h-20">
    <button
      disabled
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 rounded disabled:opacity-50"
    >
      Flash!
    </button>

    <p class="text-center text-stone-50 text-sm truncate">
      {{ imageWriterStatus }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useImagerStore } from "@/stores/imager";
import { writeBootfiles } from "@/utils/imager/imager";

const store = useImagerStore();

const imageWriterStatus = computed(() => {
  if (store.flashButtonEnabled) {
    return "Ready to flash image";
  }
  return "";
});

async function onClick() {
  if (store.selectedDisk == null) {
    console.error("Failed to flash, selectedDisk is null");
  } else if (store.selectedImageFile == null) {
    console.error("Failed to flash, selectedImageFile is null");
  } else {
    console.log(
      `Flashing ${store.selectedImageFile} to ${store.selectedDisk.path}`
    );
    await store.writeImage(store.selectedDisk, store.selectedImageFile);
    await writeBootfiles(store.selectedDisk);
  }
}
</script>
