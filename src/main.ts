import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import "./assets/tailwind.css";
// import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
const app = createApp(App);
app.component("Icon", Icon);
app.use(router);
app.mount("#app");
app.use(ElementPlus);
import "element-plus/dist/index.css";
// app.use(Antd);
// eslint-disable-next-line vue/multi-word-component-names
