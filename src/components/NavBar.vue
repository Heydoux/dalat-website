<template>
  <header>
    <router-link to="#mainContent" id="skipcontent">
      Saltar a contenido
    </router-link>
    <div class="container-lg">
      <div class="row align-items-center">
        <div id="menu-handlers">
          <button id="menuOpenBtn" to="#" onClick="{this.openMenu}">
            <img src="@/assets/images/header/Grupo_102.png" alt="" width="40" />
          </button>
          <button
            id="menuCloseBtn"
            to="#"
            class="d-none"
            onClick="{this.closeMenu}"
          >
            <img src="@/assets/images/header/Grupo_103.png" alt="" width="40" />
          </button>
        </div>
        <div class="col logo">
          <router-link to="/" class="d-inline-block dalat-link">
            <img
              src="@/assets/images/header/imagotipo.svg"
              alt=""
              width="130"
            />
          </router-link>
        </div>
        <nav class="col" role="navigation">
          <div class="menu">
            <ul class="list-unstyled mb-0" role="list">
              <li class="d-inline-block">
                <router-link to="/blog" class="d-block">Blog</router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/sobre-dalat" class="d-block">
                  Sobre Nosotros
                </router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/contacto" class="d-block">
                  Contacto
                </router-link>
              </li>
              <li class="d-inline-block">
                <router-link to="/contacto" class="d-block active">
                  Unirme a la comunidad
                </router-link>
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
    line-height: 70px;

    a {
      padding: 0px 10px;
      color: $blue;
      border-radius: 12px 2px;
      font-weight: 600;

      &.active {
        background-color: $blue;
        color: $white;

        &:focus {
          box-shadow: 0 0 0 2px $white, 0 0 0 4px $blue, 0 0 0 6px $white;
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

                &.active {
                  text-align: center;
                  color: $white;
                  font-weight: normal;
                  line-height: 50px;
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
