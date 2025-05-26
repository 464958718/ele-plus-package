import EleForm from "./src/Form/index.vue"
import EleTable from "./src/Table/index.vue"
import { App } from "vue"

export default {
    install(app: App) {
        app.component("EleForm", EleForm)
        app.component("EleTable", EleTable)
    },
}

export { EleForm, EleTable }
