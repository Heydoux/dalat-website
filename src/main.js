import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/scss/app.scss";
import { fb } from "./firebase";
import LoadScript from "vue-plugin-load-script";
import VueMeta from "vue-meta";

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.component("Navbar", require("./components/NavBar.vue").default);
Vue.component("Footer", require("./components/Footer.vue").default);
Vue.use(LoadScript);
Vue.loadScript("https://apis.google.com/js/platform.js")
  .then(() => {
    // Script is loaded, do something
  })
  .catch(() => {
    // Failed to fetch script
  });
Vue.use(VueMeta);

let app = "";

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
