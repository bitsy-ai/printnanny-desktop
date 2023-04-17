<script setup lang="ts">
import { RouterView } from "vue-router";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import ImagerSettingsForm from "@/components/forms/ImagerSettingsForm.vue";
import { RouterLink, useRouter } from "vue-router";

import { ServerIcon, CommandLineIcon } from "@heroicons/vue/24/outline";
const router = useRouter();

const navigation = [
  {
    name: "Customize OS Image",
    link: { name: "settings-imager" },
    icon: ServerIcon,
    key: "imagerSettings",
  },
  {
    name: "Developer",
    link: { name: "settings-advanced" },
    icon: CommandLineIcon,
    key: "advancedSettings",
  },
];

function isActiveRoute(key: string) {
  return router.currentRoute.value.name == key;
}
</script>

<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 p-6 h-full">
    <!-- secondary sidebar navigation -->
    <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3 border-r">
      <nav class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.key"
          :to="item.link"
          :class="[
            isActiveRoute(item.key)
              ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
              : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
            'group rounded-md px-3 py-2 flex items-center text-sm font-medium',
          ]"
          :aria-current="isActiveRoute(item.key) ? 'page' : undefined"
        >
          <component
            :is="item.icon"
            :class="[
              isActiveRoute(item.key)
                ? 'text-indigo-500 group-hover:text-indigo-500'
                : 'text-gray-400 group-hover:text-gray-500',
              'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
            ]"
            aria-hidden="true"
          />
          <span class="truncate">
            {{ item.name }}
          </span>
        </router-link>
      </nav>
    </aside>

    <!-- settings section content -->
    <section class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <main>
        <router-view name="FormView">
          <ImagerSettingsForm></ImagerSettingsForm>
        </router-view>
      </main>
    </section>
  </div>
</template>
