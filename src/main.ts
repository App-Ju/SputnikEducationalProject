import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueClickAway from "vue3-click-away";

createApp(App).use(router).use(createPinia()).use(VueClickAway).mount("#app");
