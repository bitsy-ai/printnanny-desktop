import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import type { Pi } from "printnanny-api-client";
import type { TableActionLink } from "@/types";

export function buildDeviceActions(
  pi: Pi,
  index: number
): Array<Array<TableActionLink>> {
  const externalLinks = [
    {
      href: pi.urls.mission_control,
      name: "PrintNanny OS",
      icon: ArrowTopRightOnSquareIcon,
    },
    {
      href: pi.urls.octoprint,
      name: "OctoPrint",
      icon: ArrowTopRightOnSquareIcon,
    },
    {
      href: pi.urls.syncthing,
      name: "Syncthing",
      icon: ArrowTopRightOnSquareIcon,
    },
    {
      href: pi.urls.swupdate,
      name: "Software Update",
      icon: ArrowTopRightOnSquareIcon,
    },
  ];

  const footerActions = [
    {
      name: "Delete",
      routerLink: {
        name: "device-delete",
        params: { id: pi.id },
        query: { hostname: pi.hostname },
      },
      icon: TrashIcon,
    },
  ];

  // const favoriteAction = defineComponent({
  //   extends: defineComponent({ ...DeviceFavoriteMenuItem }), data: () => ({ pi: pi, index: index })
  // });

  // const favoriteAction = DeviceFavoriteMenuItem.setup({ pi, index })

  return [externalLinks, footerActions];
}
