<script setup lang="ts">
import { BeakerIcon } from "@heroicons/vue/24/solid";

const url = import.meta.env.VITE_JOB_QUEUE_ALPHA_URL;
</script>

<template>
  <div class="text-center mx-auto p-6">
    <h3 class="mt-4 text-lg font-medium text-gray-900">Coming Soon</h3>
    <p class="mt-4 text-sm text-gray-500">
      Send a job to the next available printer on your farm.
    </p>
    <p class="mt-4 text-sm text-gray-500">
      You can request access to the alpha preview:
    </p>
    <div class="mt-6">
      <!-- @TODO replace with alpha access form url -->
      <a :href="url" target="_blank">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <BeakerIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Request Access
        </button>
      </a>
    </div>
  </div>
</template>
