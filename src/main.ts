import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./styles.css";
import App from "./App.vue";
import router from "@/routes";
import docsearch from "@docsearch/js";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount("#app");
