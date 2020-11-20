import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.config.productionTip = false

Vue.component('vue-draggable-resizable', VueDraggableResizable)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
