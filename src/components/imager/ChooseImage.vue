<script setup lang="ts">
import { open } from "@tauri-apps/api/dialog";
import { useImagerStore } from "@/stores/imager";
import { truncate } from "@/utils/text";

const store = useImagerStore();

function filename(path: string): string {
  const result = path.split("\\");
  if (result !== undefined) {
    return result?.pop()?.split("/").pop() || "";
  }
  return path;
}

async function openFile() {
  const selected = (await open({
    multiple: false,
    filters: [
      {
        name: "Image",
        extensions: ["wic", "zip", "tar.gz", "img", "iso"],
      },
    ],
  })) as string | null;
  if (selected !== null) {
    store.$patch({ selectedImageFile: selected });
    store.completeStep(0);
  }
}

function clearSelection() {
  store.$reset();
}
</script>
<template>
  <div class="flex-1">
    <div v-if="store.selectedImageFile" class="flex-1 justify-items-center">
      <button
        class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-600 rounded"
        @click="clearSelection"
      >
        Clear Selection
      </button>
      <p class="mx-auto w-48 h-12 text-center text-stone-50 text-sm truncate">
        {{ truncate(filename(store.selectedImageFile), 13) }}
      </p>
    </div>
    <button
      v-else
      class="text-center block mx-auto my-4 h-12 w-48 block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      @click="openFile"
    >
      Flash from file
    </button>
  </div>
</template>
