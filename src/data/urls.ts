import {
  ChatBubbleLeftIcon,
  BoltIcon,
  CubeTransparentIcon,
  HomeIcon,
  Square3Stack3DIcon,
  DocumentPlusIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const NAVIGATION_URLS = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: () =>{
    const router = useRouter();
    return router.currentRoute.value.name == "home"
  }},
  { name: "3D Printers", href: "/printers", icon: CubeTransparentIcon, current: () => {
    const router = useRouter();
    return router.currentRoute.value.name == "devices"
  }},
  { name: "Job Queue", href: "/queue", icon: Square3Stack3DIcon, current: () => {
    const router = useRouter();
    return router.currentRoute.value.name == "job-queue"
  }},
  { name: "Flash Device", href: "/imager", icon: BoltIcon, current: () => {
    const router = useRouter();
    return router.currentRoute.value.name == "imager"
  }}
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
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
