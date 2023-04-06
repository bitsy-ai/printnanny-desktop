<template>
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
  >
    <div class="flex h-16 shrink-0 items-center">
      <img
        class="h-8 w-auto"
        src="@/assets/icon-square.svg"
        alt="PrintNanny.ai"
      />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="-mx-2 flex-1 space-y-1">
        <li v-for="item in navigation" :key="item.name">
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
    </nav>
  </div>
</template>
<script setup lang="ts">
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
</script>
