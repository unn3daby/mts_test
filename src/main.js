import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router"
import components from "@/components/UI"
import store from "@/store/index"
import directives from './directives'

const app = createApp(App);

components.forEach(item => {
    app.component(item.name, item);
})

directives.forEach(item => {
    app.directive(item.name, item);
})

app
    .use(store)
    .use(router)
    .mount('#app')
