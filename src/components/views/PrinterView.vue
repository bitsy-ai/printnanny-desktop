<script setup lang="ts">
import moment from "moment";
import { useDeviceStore } from "@/stores/devices";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import DeviceActionMenu from "@/components/devices/DeviceActionMenu.vue";

const store = useDeviceStore();
const pis = await store.fetchDevices();
console.log("Loaded pis:", pis);
</script>
<template>
  <div class="p-4">
    <!-- device cards -->
    <ul
      v-if="pis.length > 0"
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      <li
        v-for="(pi, index) in pis"
        :key="pi.id"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-2xl border-gray-200 border border-1"
      >
        <div class="flex flex-1 flex-col p-8">
          <img
            v-if="pi.latest_camera_snapshot_url"
            class="mx-auto h-32 w-32 flex-shrink-0"
            :src="pi.latest_camera_snapshot_url"
            alt=""
          />
          <div
            v-else
            class="mx-auto h-32 w-32 flex-shrink-0 grid items-center justify-center text-center bg-gray-200 p-2 rounded"
          >
            <ExclamationTriangleIcon
              class="text-red-500 h-8 w-8 m-auto"
            ></ExclamationTriangleIcon>
            <span class="ml-2 text-sm text-red-500 font-medium">No camera</span>
          </div>
          <div class="flex grid grid-cols-2 text-sm gap-2 text-left mt-2">
            <dt class="text-gray-500">Hostname</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">
                {{ pi.hostname }}
              </div>
            </dd>
            <dt class="text-gray-500">Last Sync</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">
                {{
                  pi.last_boot
                    ? moment(pi.last_boot).fromNow()
                    : "Waiting for first boot"
                }}
              </div>
            </dd>
            <dt class="text-gray-500">Disk</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">
                {{
                  pi.system_info
                    ? pi.system_info.datafs_available_pretty
                    : "Unknown"
                }}
              </div>
            </dd>
          </div>
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dt class="sr-only">Tags</dt>
            <dd class="mt-3">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >OctoPrint</span
              >
            </dd>
          </dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200 items-center">
            <DeviceActionMenu :pi="pi" :index="index" />
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="text-center mx-auto p-6">
      <h3 class="mt-2 text-lg font-medium text-gray-900">No printers found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Install PrintNanny OS on a Raspberry Pi to get started.
      </p>
      <div class="mt-6">
        <a
          href="https://printnanny.ai/docs/category/quick-start/"
          target="_blank"
        >
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Quick Start
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
