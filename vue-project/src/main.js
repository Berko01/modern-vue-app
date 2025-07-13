import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia()) 
app.use(Toast)         

app.mount('#app')
