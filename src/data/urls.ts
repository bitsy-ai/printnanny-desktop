import {
  ChatBubbleLeftIcon,
  BoltIcon,
  CubeTransparentIcon,
  Square3Stack3DIcon,
  DocumentPlusIcon,
} from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";

const NAVIGATION_URLS = [
  {
    name: "3D Printers",
    href: "/",
    icon: CubeTransparentIcon,
    current: () => {
      const router = useRouter();
      return router.currentRoute.value.name == "devices";
    },
  },
  {
    name: "Job Queue",
    href: "/queue",
    icon: Square3Stack3DIcon,
    current: () => {
      const router = useRouter();
      return router.currentRoute.value.name == "job-queue";
    },
  },
  {
    name: "Flash Device",
    href: "/imager",
    icon: BoltIcon,
    current: () => {
      const router = useRouter();
      return router.currentRoute.value.name == "imager";
    },
  },
  {
    name: "Settings",
    href: "/settings/imager/",
    icon: Cog6ToothIcon,
    current: () => {
      const router = useRouter();
      return (
        router.currentRoute.value.name &&
        router.currentRoute.value.name.includes("settings")
      );
    },
  },
];

const HELP_URLS = [
  {
    name: "Quick Start",
    href: "https://printnanny.ai/docs/category/quick-start/",
    icon: DocumentPlusIcon,
    current: false,
  },
];

const COMMUNITY_URLS = [
  { name: "Discord", href: "", icon: ChatBubbleLeftIcon, current: false },
];

export { COMMUNITY_URLS, HELP_URLS, NAVIGATION_URLS };
