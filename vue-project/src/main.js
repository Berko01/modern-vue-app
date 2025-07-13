import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

createApp(App).use(Toast).mount('#app')
