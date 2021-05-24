import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import escpos from "escpos";
import { stateSymbol, createState } from './store'
import { formatDate } from '@/helpers/formatDate'

const app = createApp(App)

app.mixin({
  methods: {
    formatDate,
  },
})
app.use(router)
app.provide(stateSymbol, createState())

// app.use(escpos)
app.mount('#app')
