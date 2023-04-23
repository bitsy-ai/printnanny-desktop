import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { defineStore, acceptHMRUpdate } from "pinia";
import { error } from "@/utils/error";
import {
  Cog6ToothIcon,
  PlusSmallIcon,
  ServerIcon,
  BoltIcon,
} from "@heroicons/vue/24/solid";
import {
  CrossPlatformDisk,
  ImageWriteProgress,
  ImageWriteProgressInterface,
} from "@/types";
import { useSettingsStore } from "./settings";
import { CloudInitGenerator } from "../utils/imager/cloudInit";

export const useImagerStore = defineStore({
  id: "imager",
  state: () => ({
    disks: [] as Array<CrossPlatformDisk>,
    loading: false,
    progress: null as null | ImageWriteProgress,
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
  getters: {
    flashButtonEnabled: (state) =>
      state.steps[0].complete &&
      state.steps[1].complete &&
      state.steps[2].complete,
  },
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
    async writeBootFiles(disk: CrossPlatformDisk) {
      console.log("Writing settings to disk", disk);
      const settings = useSettingsStore();
      let progress = new ImageWriteProgress({
        label: "Customizing image...",
        percent: 25,
      });
      this.$patch({ progress: progress });

      const generator = new CloudInitGenerator(settings.form);
      let filename = CloudInitGenerator.userDataFilename();
      await invoke("write_bootfile", {
        diskPath: disk.path,
        filename: filename,
        contents: generator.generateUserData(),
      }).catch((e: Error) => {
        error("Error customizing image", e);
      });
      console.log(`Success! Wrote ${filename}`);
      progress = new ImageWriteProgress({
        label: "Customizing image...",
        percent: 75,
      });
      this.$patch({ progress: progress });
      filename = CloudInitGenerator.networkDataFilename();
      await invoke("write_bootfile", {
        diskPath: disk.path,
        filename: filename,
        contents: generator.generateNetworkData(),
      }).catch((e: Error) => {
        error("Error customizing image", e);
      });
      console.log(`Success! Wrote ${filename}`);
      progress = new ImageWriteProgress({
        label: "Customizing image...",
        percent: 100,
      });
      this.$patch({ progress: progress });
    },
    async writeImage(disk: CrossPlatformDisk, imagePath: string) {
      const unlisten = await listen<string>("image_write_progress", (event) => {
        // console.log(`Got image_write_progress, payload:`, event);
        const payload = event.payload as unknown;
        const parsed = payload as ImageWriteProgressInterface;
        const progress = new ImageWriteProgress(parsed);
        this.$patch({ progress: progress });
      });
      console.log("Created image_write_progress listener");

      await invoke("write_image", {
        imagePath: imagePath,
        disk: disk.path,
        deviceId: disk.deviceId,
      }).catch((e: Error) => {
        const header = "Image write failed";
        const msg = `Failed to write ${imagePath} to disk ${disk} with error: \n ${e}`;
        error(header, msg);
      });
      console.log(`Finished writing ${imagePath} to ${disk.path}`);

      // clean up listener
      unlisten();
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
