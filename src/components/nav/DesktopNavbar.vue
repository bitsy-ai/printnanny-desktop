<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900">
      <div class="flex h-20 shrink-0 items-center px-4 pt-6">
        <img
          class="h-20 w-auto"
          src="@/assets/logo/logo-rect-dark.svg"
          alt="PrintNanny.ai"
        />
      </div>
      <div id="docsearch" class="w-full px-4"></div>

      <nav class="flex flex-1 flex-col px-6">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in NAVIGATION_URLS" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current()
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <!--
              <li>
                <div class="text-xs font-semibold leading-6 text-gray-400">Your Printers:</div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li v-for="team in teams" :key="team.name">
                    <a :href="team.href" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ team.initial }}</span>
                      <span class="truncate">{{ team.name }}</span>
                    </a>
                  </li>
                </ul>
              </li>
            -->
          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              Community
            </div>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in COMMUNITY_URLS" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              Help & Support
            </div>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in HELP_URLS" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { NAVIGATION_URLS, HELP_URLS, COMMUNITY_URLS } from "@/data/urls";
import { Hit } from "./AlgoliaHit";
import docsearch from "@docsearch/js";
import "@docsearch/css";

// const userNavigation = [
//   {
//     name: "Logout",
//     href: "/logout",
//   },
// ];

onMounted(() => {
  // initialize Algolia docsearch
  docsearch({
    container: "#docsearch",
    appId: import.meta.env.VITE_ALGOLIA_APP_ID,
    indexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME,
    // Public Search API key: it is safe to commit it
    apiKey: import.meta.env.VITE_ALGOLIA_API_KEY,
    hitComponent: Hit,
  });
});
</script>
<style>
.DocSearch-Button {
  margin: 0;
  width: 95%;
}
</style>
