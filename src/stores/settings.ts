import { defineStore, acceptHMRUpdate } from "pinia";
import type { CloudInitForm } from "@/utils/imager/cloudInit";
import { CloudInitGenerator } from "@/utils/imager/cloudInit";
export const useSettingsStore = defineStore({
  id: "settings",
  persist: true,
  state: () => ({
    form: CloudInitGenerator.default(),
  }),
  actions: {
    async saveForm(fieldset: CloudInitForm): Promise<CloudInitForm> {
      // encrypt sensitive fields
      const encryptedFieldset = await CloudInitGenerator.encryptSensitive(
        fieldset
      );
      this.$patch({ savedFormValues: encryptedFieldset });
      return encryptedFieldset;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
