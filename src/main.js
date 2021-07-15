import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import VueQuillEditor from 'vue-quill-editor';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */);


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
    messages
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
