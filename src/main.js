import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/scss/app.scss";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
import LoadScript from "vue-plugin-load-script";
import VueMeta from "vue-meta";
import Swal from "sweetalert2";
import VueSocialSharing from "vue-social-sharing";
import VueMobileDetection from "vue-mobile-detection";

window.$ = window.jQuery = jQuery;
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

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
Vue.use(VueFirestore);
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});
Vue.use(VueMeta);
Vue.use(VueSocialSharing);
Vue.use(VueMobileDetection);

let app = "";

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
