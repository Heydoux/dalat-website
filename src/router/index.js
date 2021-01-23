import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import SobreDalat from "../views/SobreDalat.vue";
import Blog from "../views/Blog.vue";
import Post from "../views/BlogPost.vue";
import Contacto from "../views/Contacto.vue";
import Dashboard from "../views/Dashboard.vue";
import ArticleList from "../views/ArticleList.vue";
import ArticleCreate from "../views/ArticleCreate.vue";
import ArticleModify from "../views/ArticleModify.vue";
import Login from "../views/Login.vue";
import { fb } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "articlelist",
        name: "articlelist",
        component: ArticleList
      },
      {
        path: "articlecreate",
        name: "articlecreate",
        component: ArticleCreate
      },
      {
        path: "articlemodify",
        name: "articlemodify",
        component: ArticleModify,
        props: true
      }
    ]
  },
  {
    path: "/sobre-dalat",
    name: "About",
    component: SobreDalat
  },
  {
    path: "/contacto",
    name: "Contact",
    component: Contacto
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog
  },
  {
    path: "/blog/:slug",
    name: "post",
    component: Post
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
