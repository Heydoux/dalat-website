<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <nav id="sidebar" class="sidebar-wrapper">
        <div
          class="sidebar-content mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar desktop"
        >
          <div
            id="mCSB_1"
            class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
            style="max-height: none;"
            tabindex="0"
          >
            <div
              id="mCSB_1_container"
              class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
              style="position:relative; top:0; left:0;"
              dir="ltr"
            >
              <!-- sidebar-brand  -->
              <div class="sidebar-item sidebar-brand">
                <a href="#">Dalat Administración</a>
              </div>
              <!-- sidebar-menu  -->
              <div class="sidebar-item sidebar-menu">
                <ul>
                  <li class="header-menu">
                    <span>General</span>
                  </li>
                  <li class="sidebar-dropdown">
                    <router-link to="/admin/articlecreate">
                      <img
                        src="@/assets/images/admin/newarticle.svg"
                        alt=""
                        class="icon"
                      />
                      <span class="menu-text">Crear nuevo articulo</span>
                    </router-link>
                  </li>
                  <li class="sidebar-dropdown">
                    <router-link to="/admin/articlelist">
                      <img
                        src="@/assets/images/admin/list.svg"
                        alt=""
                        class="icon"
                      />
                      <span class="menu-text">Lista de articulos</span>
                    </router-link>
                  </li>
                  <li class="sidebar-dropdown">
                    <router-link to="/admin/profesionales">
                      <img
                        src="@/assets/images/admin/add-pro.svg"
                        alt=""
                        class="icon"
                      />
                      <span class="menu-text">Profesionales</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- sidebar-menu  -->
            </div>
          </div>
        </div>
        <div class="sidebar-footer">
          <div>
            <a href="#" @click="logout()">
              <img src="@/assets/images/admin/logout.svg" alt="" class="icon" />
              <span class="menu-text">Desconectar</span>
            </a>
          </div>
        </div>
      </nav>
      <!-- page-content  -->
      <main class="page-content py-0 h-100">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";

// @ is an alias to /src
export default {
  name: "Admin",
  components: {},
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar-menu {
  margin-top: 1rem;
  padding-top: 3rem;
}
.icon {
  margin-right: 1rem;
}

.sidebar-dropdown {
  a:hover {
    text-decoration: underline !important;
  }
}
</style>
