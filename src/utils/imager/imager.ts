import { Child, Command } from "@tauri-apps/api/shell";
import { platform } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";

import {
  CrossPlatformDisk,
  ImageWriteProgress,
  ImageWriteProgressInterface,
} from "@/types";
import { useImagerStore } from "@/stores/imager";
// import { useSettingsStore } from "@/store/settings";
import { CloudInitGenerator } from "./cloudInit";
import { error } from "@/utils/error";

// write /boot/user-data and /boot/network-config
async function writeBootfiles(disk: CrossPlatformDisk) {
  console.log("Writing bootfiles to disk", disk);
  //   const store = useStore();
  //   const settingsStore = useSettingsStore();
  //   const progress = new ImageWriteProgress({
  //     label: "Finalizing image...",
  //     percent: 25,
  //   });
  //   store.$patch({ progress: progress });
  //   if (settingsStore.savedFormValues) {
  //     const generator = new CloudInitGenerator(settingsStore.savedFormValues);
  //     let filename = CloudInitGenerator.userDataFilename();
  //     await invoke("write_bootfile", {
  //       diskPath: disk.path,
  //       filename: filename,
  //       contents: generator.generateUserData(),
  //     }).catch(showError);
  //     console.log(`Success! Wrote ${filename}`);
  //     let progress = new ImageWriteProgress({
  //       label: "Finalizing image...",
  //       percent: 75,
  //     });
  //     store.$patch({ progress: progress });
  //     filename = CloudInitGenerator.networkDataFilename();
  //     await invoke("write_bootfile", {
  //       diskPath: disk.path,
  //       filename: filename,
  //       contents: generator.generateNetworkData(),
  //     }).catch(showError);
  //     console.log(`Success! Wrote ${filename}`);
  //     progress = new ImageWriteProgress({
  //       label: "Finalizing image...",
  //       percent: 100,
  //     });
  //     store.$patch({ progress: progress });
  //   } else {
  //     const progress = new ImageWriteProgress({
  //       label: "Finalizing image...",
  //       percent: 100,
  //     });
  //     store.$patch({ progress: progress });
  //   }
}

// async function flashImage(disk: CrossPlatformDisk, imagePath: string) {
//   const platformName = await platform();
//   let command = null as null | Command;
//   let child = null as null | Child;
//   switch (platformName) {
//     case "linux":
//       command = await new Command("write-image--linux", [
//         "dd",
//         "bs=4M",
//         "status=progress",
//         `if=${imagePath}`,
//         `of=${disk.path}`,
//       ]);
//       command.on("close", (data) => {
//         console.log(
//           `command finished with code ${data.code} and signal ${data.signal}`
//         );
//       });
//       command.on("error", (error) =>
//         console.error(`command error: "${error}"`)
//       );
//       command.stdout.on("data", (line) =>
//         console.log(`command stdout: "${line}"`)
//       );
//       command.stderr.on("data", (line) =>
//         console.log(`command stderr: "${line}"`)
//       );
//       child = await command.spawn();
//       console.log("flashImage pid: ", child.pid);
//       break;
//     case "win32":
//     case "darwin":
//       await writeImage(disk, imagePath);
//       break;
//   }
// }

export { writeBootfiles };
