import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import { router } from "./routes/routes.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).mount("#app");
