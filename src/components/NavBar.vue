<template>
  <header class="position-relative">
    <a href="#mainContent" id="skipcontent" @click="jumpMainContent">
      Saltar a contenido
    </a>
    <div class="container-lg">
      <div class="row align-items-center">
        <div id="logo">
          <router-link to="/" class="d-inline-block dalat-link">
            <img
              src="@/assets/images/header/imagotipo.svg"
              alt="Página principal"
              width="130"
            />
          </router-link>
        </div>
        <button id="hamburger" aria-expanded="true" @click="toggleMenu">
          <img
            class="openMenu"
            loading="lazy"
            src="@/assets/images/header/Grupo_102.png"
            alt="Abrir el menu"
          />
          <img
            class="closeMenu"
            loading="lazy"
            src="@/assets/images/header/Grupo_103.png"
            alt="Cerrar el menu"
          />
        </button>
        <nav class="col main-nav" role="navigation">
          <div class="menu">
            <ul class="list-unstyled mb-0" role="list">
              <li class="d-inline-block">
                <router-link to="/blog" class="d-block px-3">Blog</router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/sobre-dalat" class="d-block px-3">
                  Sobre Dalat
                </router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/contacto" class="d-block px-3">
                  Contacto
                </router-link>
              </li>
              <li class="d-inline-block">
                <a
                  href="https://dalat-a11y.slack.com/"
                  class="d-block active px-3 ml-4"
                  target="_blank"
                >
                  Unirme a la comunidad
                  <span class="sr-only">Abre en otra pagina</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    jumpMainContent() {
      $("#mainContent").focus();
    },
    toggleMenu() {
      console.log($("#hamburger").attr("aria-expanded"));
      if ($("#hamburger").attr("aria-expanded") == "false") {
        $("#hamburger").attr("aria-expanded", "true");
        $("header").css("minHeight", "100vh");
        $("#logo").css("marginTop", "10vh");
      } else {
        $("#hamburger").attr("aria-expanded", "false");
        $("header").css("minHeight", "unset");
        $("#logo").css("marginTop", "unset");
      }
    }
  },
  mounted() {
    $("#hamburger").attr("aria-expanded", "false");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#hamburger[aria-expanded="true"] + .main-nav {
  display: block;
}
header {
  padding: 10px 0;
  box-shadow: 0px 3px 6px $shadow;

  #skipcontent {
    position: absolute;
    left: -100%;
    top: 0;

    &:focus {
      left: 0;
    }
  }

  .dalat-link {
    border-top-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }

  #hamburger {
    display: none;
    top: 10px;
  }

  nav {
    text-align: right;
    height: 70px;

    ul {
      line-height: 45px;
      margin-top: 12px;

      a {
        color: $blue;
        border-radius: 12px 2px;
        font-weight: 700;

        &.active {
          background-color: $blue;
          color: $white;
          font-weight: normal;

          &:focus {
            box-shadow: 0 0 0 2px $white, 0 0 0 4px $blue, 0 0 0 6px $white;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  header {
    #skipcontent {
      z-index: 10;
    }

    .container-lg {
      height: 100%;

      .row {
        margin: 0;
        display: block;
        text-align: center;
        height: 100%;

        #hamburger {
          position: absolute;
          display: block;
          background: transparent;
          border: none;
          top: 50%;
          transform: translateY(-50%);

          &[aria-expanded="true"] {
            top: 20px;
            transform: none;

            .openMenu {
              display: none;
            }
            .closeMenu {
              display: block;
            }
          }

          .openMenu {
            display: block;
            margin: auto;
            width: 25px;
          }

          .closeMenu {
            display: none;
            margin: auto;
            width: 20px;
          }

          img {
            max-width: 100%;
          }
        }

        #logo {
          width: fit-content;
          margin: auto;
        }

        nav {
          display: none;
          width: 100%;
          text-align: left;
          height: 100%;

          .menu {
            top: 90px;
            background-color: $white;
            height: calc(100% - 170px - 11vh);

            ul {
              margin-top: 7vh;
              display: flex;
              flex-direction: column;
              height: 100%;

              & > :last-child {
                margin-top: auto;
              }

              a {
                display: block;
                margin: 0;
                z-index: 1;
                color: $blue;
                font-size: 18px;
                font-weight: bold;
                padding-top: 1rem;
                padding-bottom: 1rem;

                &.active {
                  text-align: center;
                  color: $white;
                  font-weight: normal;
                  line-height: 50px;
                  padding-top: 0;
                  padding-bottom: 0;
                  margin-left: 0 !important;
                  margin-top: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
