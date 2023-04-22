import { defineStore, acceptHMRUpdate } from "pinia";
import type * as api from "printnanny-api-client";
import { handleApiError } from "@/utils/api";
import { useAccountStore } from "./account";

export const useDeviceStore = defineStore({
  id: "devices",
  state: () => ({
    pis: [] as Array<api.Pi>,
    loading: false,
  }),
  getters: {},
  actions: {
    async fetchDevices(): Promise<Array<Pi> | undefined> {
      this.$patch({ loading: true });
      const accountStore = useAccountStore();
      const res = await accountStore.devicesApi.pisList().catch(handleApiError);
      console.debug("pisList response ", res);
      if (res?.data?.results) {
        this.$patch({
          loading: false,
          pis: res.data.results,
        });
        return res.data.results;
      } else {
        this.$patch({ loading: false });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDeviceStore, import.meta.hot));
}
