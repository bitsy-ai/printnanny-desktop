<script setup lang="ts">
import { useRouter } from "vue-router";
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
    store.nextStep();
  }
}

function clearSelection() {
  store.$reset();
}
</script>
<template>
  <div class="flex h-full content-center items-center justify-items-center">
    <div v-if="store.selectedImageFile" class="flex-1 justify-items-center">
      <button
        class="text-center block mx-4 my-4 h-12 w-48 block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-600 rounded"
        @click="clearSelection"
      >
        Clear Selection
      </button>
      <p class="mx-4 text-left text-stone-50 text-sm truncate">
        {{ truncate(filename(store.selectedImageFile), 13) }}
      </p>
    </div>
    <button
      v-else
      class="m-auto text-center block mx-4 my-4 h-12 w-48 block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-600 rounded"
      @click="openFile"
    >
      Flash from file
    </button>
  </div>
</template>
