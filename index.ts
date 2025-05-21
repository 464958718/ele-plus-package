import Button from './src/Button.vue'
import { App } from 'vue'

export default {
    install(app: App) {
        app.component('Button', Button)
    }
}

export { Button }
