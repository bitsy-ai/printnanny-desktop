import { AlertAction, Alert } from "@/types";
import { useAlertStore } from "@/stores/alerts";
import { ExclamationCircleIcon, CheckIcon } from "@heroicons/vue/24/outline";

export function success(
  header: string,
  message: string,
  actions: Array<AlertAction> = []
) {
  const store = useAlertStore();
  const alert = {
    header,
    message,
    actions,
    icon: CheckIcon,
    iconClass: "text-emerald-500",
  };
  store.push(alert);
}

export function warning(
  header: string,
  message: string,
  actions: Array<AlertAction> = []
) {
  const store = useAlertStore();
  const alert = {
    header,
    message,
    actions,
    icon: ExclamationCircleIcon,
    iconClass: "text-amber-500",
  };
  store.push(alert);
}

export function error(
  header: string,
  message: string,
  actions: Array<AlertAction> = []
) {
  const store = useAlertStore();
  const alert = {
    header,
    message,
    icon: ExclamationCircleIcon,
    actions,
    iconClass: "text-red-500",
  };
  store.push(alert);
}
