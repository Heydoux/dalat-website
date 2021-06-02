<template>
  <header>
    <a href="#mainContent" id="skipcontent" @click="jumpMainContent">
      Saltar a contenido
    </a>
    <div class="container-lg">
      <div class="row align-items-center">
        <div id="menu-handlers">
          <button id="menuOpenBtn" to="#" @click="openMenu">
            <img src="@/assets/images/header/Grupo_102.png" alt="" width="40" />
          </button>
          <button id="menuCloseBtn" to="#" class="d-none" @click="closeMenu">
            <img src="@/assets/images/header/Grupo_103.png" alt="" width="40" />
          </button>
        </div>
        <div class="col logo">
          <router-link to="/" class="d-inline-block dalat-link">
            <img
              src="@/assets/images/header/imagotipo.svg"
              alt="dalat inicio"
              width="130"
            />
          </router-link>
        </div>
        <nav class="col" role="navigation">
          <div class="menu">
            <ul class="list-unstyled mb-0" role="list">
              <li class="d-inline-block">
                <router-link to="/blog" class="d-block px-3">Blog</router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/sobre-dalat" class="d-block px-3">
                  Sobre Nosotros
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
    openMenu() {
      $("nav").css("display", "block");
      $("#menuCloseBtn").removeClass("d-none");
      $("#menuCloseBtn").addClass("d-block");
      $("#menuOpenBtn").addClass("d-none");
      $("#menuOpenBtn").addClass("d-none");
      $("header").css("minHeight", "100vh");
      $("#menu-handlers").addClass("position-relative");
    },
    closeMenu() {
      $("nav").css("display", "none");
      $("#menuCloseBtn").addClass("d-none");
      $("#menuCloseBtn").removeClass("d-block");
      $("#menuOpenBtn").removeClass("d-none");
      $("header").css("height", "unset");
      $("#menu-handlers").removeClass("position-relative");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

  .col.logo {
    flex: 0 0 130px;
  }

  .dalat-link {
    border-top-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }

  #menu-handlers {
    display: none;
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

        #menu-handlers {
          position: absolute;
          display: block;

          button {
            border: none;
            background: $white;

            &#menuCloseBtn {
              margin-bottom: 4vh;
            }
          }
        }

        .logo {
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
