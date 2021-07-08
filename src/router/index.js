import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import Prox from "../views/Prox.vue";
import Admin from "../views/Admin.vue";
import SobreDalat from "../views/SobreDalat.vue";
import Blog from "../views/Blog.vue";
import Post from "../views/BlogPost.vue";
import Contacto from "../views/Contacto.vue";
import Dashboard from "../views/Dashboard.vue";
import ArticleList from "../views/ArticleList.vue";
import ArticleCreate from "../views/ArticleCreate.vue";
import ArticleModify from "../views/ArticleModify.vue";
import Profesional from "../views/Profesional.vue";
import Login from "../views/Login.vue";
import { fb } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Inicio",
      metaTags: [
        {
          name: "description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:title",
          content: "Inicio"
        },
        {
          property: "og:description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:type",
          content: "Website"
        }
      ]
    }
  },
  /*{
    path: "/",
    name: "Prox",
    component: Prox
  },*/
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Administración"
    }
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
      },
      {
        path: "profesionales",
        name: "profesionales",
        component: Profesional
      }
    ]
  },
  {
    path: "/sobre-dalat",
    name: "About",
    component: SobreDalat,
    meta: {
      title: "Sobre Dalat",
      metaTags: [
        {
          name: "description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:title",
          content: "Sobre Dalat"
        },
        {
          property: "og:description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:type",
          content: "Website"
        }
      ]
    }
  },
  {
    path: "/contacto",
    name: "Contact",
    component: Contacto,
    meta: {
      title: "Contacto",
      metaTags: [
        {
          name: "description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:title",
          content: "Contacto"
        },
        {
          property: "og:description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:type",
          content: "Website"
        }
      ]
    }
  },
  {
    path: "/blog/",
    name: "Blog",
    component: Blog,
    meta: {
      title: "Blog",
      metaTags: [
        {
          name: "description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:title",
          content: "Dalat Blog"
        },
        {
          property: "og:description",
          content:
            "Somos profesionales de Accesibilidad que buscan generar y divulgar conocimiento sobre la materia e impulsar a personas y comunidades latinoamericanas."
        },
        {
          property: "og:type",
          content: "Website"
        }
      ]
    }
  },
  {
    path: "/blog/:slug",
    name: "post",
    component: Post,
    meta: {
      title: "Dalat Comunidad"
    }
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

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(
      document.querySelectorAll("[data-vue-router-controlled]")
    ).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
      .map(tagDef => {
        const tag = document.createElement("meta");

        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute("data-vue-router-controlled", "");

        return tag;
      })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));

    next();
  }
});

export default router;
