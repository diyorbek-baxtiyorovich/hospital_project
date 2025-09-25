import {createApp} from 'vue'
import App from '@/App.vue'
import {registerPlugins} from '@core/utils/plugins'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import VMask from "@ssibrahimbas/v-mask";

const options = {
  position: 'top-center',
  timeout: 4000,
}


// Create vue app
const app = createApp(App)

app.use(Toast, options)
app.use(VMask)
app.use(VueViewer)


// Register plugins
registerPlugins(app)


// Mount vue app
app.mount('#app')
