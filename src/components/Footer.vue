<template>
  <footer>
    <div class="container-lg footer-wrapper">
      <div class="text-center text-md-left">
        <img
          src="@/assets/images/footer/dalat-logotipo.svg"
          alt=""
          class="footer-logo"
        />
      </div>
      <div class="row no-gutters align-items-center">
        <div class="col footer-slogan">
          Somos un grupo de profesionales especializados en accesibilidad.
        </div>
        <div class="col footer-nav text-sm-cente mt-4 mt-md-0">
          <ul class="list-unstyled mb-0 text-md-right" role="list">
            <li class="d-inline-block mb-3">
              <a classnamename="d-block" href="/blog">Blog</a>
            </li>
            <li class="d-inline-block mb-3">
              <a classnamename="d-block" href="/sobre-dalat">Sobre Nosotros</a>
            </li>
            <li class="d-inline-block mb-3">
              <a classnamename="d-block" href="/contacto">Contacto</a>
            </li>
            <li class="d-inline-block mb-3">
              <a
                classnamename="d-block"
                href="https://cutt.ly/HbTI7X5"
                target="_blank"
              >
                Unirme a la comunidad
                <span class="sr-only">Abre en otra pagina</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copy text-center">
      DALAT Desarrollo Accessible Latinoamericano
      <span aria-hidden="true" class="ml-2">&lt;3</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {}
};
</script>

<style scoped lang="scss">
footer {
  background-color: $blue;
  color: $white;

  .footer-wrapper {
    padding-top: 45px;
    padding-bottom: 30px;

    @include media-breakpoint-down(sm) {
      padding-top: 35px;
      padding-bottom: 20px;
    }
  }

  a {
    color: $white;
    padding: 5px 10px;
    border: 2px dashed transparent;
    text-decoration: underline;

    &:hover,
    &:focus {
      color: $white;
    }

    &:focus {
      box-shadow: 0 0 0 2px transparent, 0 0 0 2px $light-blue;
    }
  }
}

.footer-logo {
  max-width: 315px;
  margin-bottom: 35px;
}

.footer-slogan {
  max-width: 260px;
  flex: 0 0 260px;
}

@include media-breakpoint-down(sm) {
  .footer-slogan,
  .footer-nav {
    max-width: 100%;
    flex: 0 0 100%;
  }
}

.footer-copy {
  padding: 15px 0;
  background-color: #ffffff;
  color: #0a3055;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .footer-slogan {
    padding-left: 10px !important;
  }

  .footer-copy {
    font-size: 12px;
  }
}
</style>
