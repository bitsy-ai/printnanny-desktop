import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";

interface AlertAction {
  color: string;
  text: string;
  onClick: () => void;
}

interface Alert {
  message: string;
  header: string;
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps>;
  actions: Array<AlertAction>;
  error: Error | undefined | string;
}

export type { AlertAction, Alert };
