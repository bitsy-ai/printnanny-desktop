import type { UiAlert } from "@/types";
import { defineStore, acceptHMRUpdate } from "pinia";
import * as api from "printnanny-api-client";
import { handleApiError } from "@/utils/api";
import { posthogIdentify, posthogReset } from "@/utils/posthog";

export const useAccountStore = defineStore({
  id: "accounts",
  state: () => ({
    email: undefined as undefined | string,
    userId: undefined as undefined | number,
    user: undefined as api.User | undefined,
    nkey: undefined as api.NatsOrganizationUser | undefined,
    token: undefined as string | undefined,
    apiConfig: new api.Configuration({
      basePath: import.meta.env.VITE_PRINTNANNY_API_URL,
    }),
  }),
  getters: {
    isAuthenticated: (state) => state.user !== undefined,
    accountsApi: (state) => api.AccountsApiFactory(state.apiConfig),
    achievementsApi: (state) => api.AchievementsApiFactory(state.apiConfig),
    crashReportsApi: (state) => api.CrashReportsApiFactory(state.apiConfig),
    devicesApi: (state) => api.DevicesApiFactory(state.apiConfig),
    settingsApi: (state) => api.SettingsApiFactory(state.apiConfig),
    shopApi: (state) => api.ShopApiFactory(state.apiConfig),
    videosApi: (state) => api.VideosApiFactory(state.apiConfig),
  },
  actions: {
    async fetchUser() {
      const userData = await this.accountsApi
        .accountsUserRetrieve()
        .catch((e: any) => {
          console.warn(e);
        });
      if (userData && userData.data) {
        console.log("Authenticated as user", userData.data);
        this.$patch({
          user: userData.data,
          userId: userData.data.id,
        });
        // posthogIdentify(userData.data);
        return userData.data;
      }
    },
    async resendVerificationEmail(email: string) {
      console.log("Resending verification email to: ", email);
    },
    /**
     * Attempt to login a user
     * @param {api.LoginRequest} request
     */
    async login(request: api.LoginRequest) {
      await this.accountsApi.accountsLoginCreate(request).catch(handleApiError);
      await this.fetchUser();
      await this.$router.push({ name: "devices" });
    },
    /**
     * Invalidate current session
     */
    async logout() {
      // nothing to do if user not set
      if (this.user == undefined) {
        console.warn("logout action called without user set");
        return;
      }
      await this.accountsApi.accountsLogoutCreate().catch(handleApiError);
      this.$reset();
      posthogReset();
      console.info("Successfully logged out");
    },

    async createAccount(
      request: api.RegisterRequest
    ): Promise<undefined | api.User> {
      await this.accountsApi
        .accountsRegistrationCreate(request)
        .catch(handleApiError);
      await this.accountsApi
        .accountsLoginCreate({
          email: request.email,
          password: request.password1,
        } as api.LoginRequest)
        .catch(handleApiError);
      const user = await this.fetchUser();
      return user;
    },
    async twoFactorStage1(email: string): Promise<boolean> {
      const req = { email } as api.EmailAuthRequest;
      const res = await this.accountsApi
        .accounts2faAuthEmailCreate(req)
        .catch(handleApiError);
      return res !== undefined && res.status == 200;
    },

    async twoFactorStage2(email: string, token: string): Promise<boolean> {
      const req = { email, token } as api.CallbackTokenAuthRequest;
      const res = await this.accountsApi
        .accounts2faAuthSessionCreate(req) // accounts2faAuthSessionCreate returns a bearer token as well as setting a session authentication cookie
        .catch(handleApiError);
      console.debug("accounts2faAuthTokenCreate response: ", res);
      const ok = res !== undefined && res.status === 200;
      if (ok) {
        const token = res.data.token;
        const apiConfig = new api.Configuration({
          basePath: import.meta.env.VITE_PRINTNANNY_API_URL,
          baseOptions: {
            headers: { Authorization: `Bearer ${token}` },
          },
        });
        this.$patch({ token, apiConfig });
        await this.fetchUser();
      }
      return ok;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
