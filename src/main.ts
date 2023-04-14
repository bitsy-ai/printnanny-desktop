import { createApp } from "vue";
import tauriPinia from "@bitsy-ai/tauri-pinia";

import "./styles.css";
import App from "./App.vue";
import router from "@/routes";

const app = createApp(App);
app.use(await tauriPinia({ singleFile: false }));
app.use(router);

app.mount("#app");
