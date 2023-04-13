import { createApp } from "vue";
import { createPinia } from "pinia";
import tauriPinia from "@bitsy-ai/tauri-pinia";

import "./styles.css";
import App from "./App.vue";
import router from "@/routes";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(await tauriPinia);

app.mount("#app");
