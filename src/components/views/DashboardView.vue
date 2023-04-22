<script setup lang="ts">
import { RouterView } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { EnvelopeIcon, PhoneIcon, PlusIcon } from "@heroicons/vue/20/solid";
import DeviceActionMenu from "@/components/devices/DeviceActionMenu.vue";

const store = useDashboardStore();
const pis = await store.fetchDevices();
console.log("Loaded pis:", pis);
</script>
<template>
  <div>
    <!-- device cards -->
    <ul
      v-if="pis.length > 0"
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <li
        v-for="(pi, index) in pis"
        :key="pi.id"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      >
        <div class="flex flex-1 flex-col p-8">
          <img
            v-if="pi.latest_camera_snapshot_url"
            class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            :src="pi.latest_camera_snapshot_url"
            alt=""
          />
          <h3 class="mt-6 text-sm font-medium text-gray-900">
            {{ pi.hostname }}
          </h3>
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dt class="sr-only">Title</dt>
            <dd class="text-sm text-gray-500">{{ pi.hostname }}</dd>
            <dt class="sr-only">Role</dt>
            <dd class="mt-3">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >{{ pi.hostname }}</span
              >
            </dd>
          </dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
              <a
                :href="`mailto:${pi.created_dt}`"
                class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <EnvelopeIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Email
              </a>
            </div>
            <div class="-ml-px flex w-0 flex-1">
              <DeviceActionMenu :pi="pi" :index="index" />
            </div>
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
