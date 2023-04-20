import { toRaw } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { defineStore, acceptHMRUpdate } from "pinia";

import {
  Cog6ToothIcon,
  PlusSmallIcon,
  ServerIcon,
  BoltIcon,
} from "@heroicons/vue/24/solid";
import { CrossPlatformDisk } from "@/types";

export const useImagerStore = defineStore({
  id: "imager",
  state: () => ({
    disks: [] as Array<CrossPlatformDisk>,
    loading: false,
    selectedDisk: null as null | string,
    selectedImageFile: null as null | string,
    steps: [
      {
        name: "Flash from file",
        complete: false,
        solidIcon: PlusSmallIcon,
      },
      {
        name: "Select Disk",
        complete: false,
        solidIcon: ServerIcon,
      },
      {
        name: "Customize",
        complete: false,
        solidIcon: Cog6ToothIcon,
      },
      {
        name: "Flash",
        complete: false,
        solidIcon: BoltIcon,
      },
    ],
  }),
  actions: {
    async listRemoveableDrives(): Promise<Array<CrossPlatformDisk>> {
      this.$patch({ loading: true });
      const output = await invoke("list_diskdrives");
      if (output) {
        const parsed = JSON.parse(output as string);
        const disks = parsed.map((d: any) => new CrossPlatformDisk(d));
        console.log("Found removeable disks", disks);
        this.$patch({ disks, loading: false });
        return disks;
      }
      this.$patch({ loading: false });
      return [];
    },
    completeStep(idx: number) {
      this.$patch((state) => {
        state.steps[idx].complete = true;
      });
    },
    resetStep(idx: number) {
      this.$patch((state) => {
        state.steps[idx].complete = false;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagerStore, import.meta.hot));
}
