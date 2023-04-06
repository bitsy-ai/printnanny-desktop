import {
  ChatBubbleLeftIcon,
  BoltIcon,
  CubeTransparentIcon,
  HomeIcon,
  Square3Stack3DIcon,
  DocumentPlusIcon,
} from "@heroicons/vue/24/outline";

const NAVIGATION_URLS = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "3D Printers", href: "#", icon: CubeTransparentIcon, current: false },
  { name: "Job Queue", href: "#", icon: Square3Stack3DIcon, current: false },
  { name: "Flash Device", href: "#", icon: BoltIcon, current: false },
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
