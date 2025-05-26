import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import ElePlusPackage from "../index"
import "element-plus/dist/index.css"

const app = createApp(App)

app.use(ElementPlus).use(ElePlusPackage).mount("#app")
