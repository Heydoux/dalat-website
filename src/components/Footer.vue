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
        <div class="col footer-slogan text-sm-center">
          Somos un grupos de profesionales especializados en accesibilidad.
        </div>
        <div class="col footer-nav text-sm-cente mt-4 mt-md-0">
          <ul class="list-unstyled mb-0" role="list">
            <li class="d-inline-block">
              <a classnamename="d-block" href="/blog">Blog</a>
            </li>
            <li class="d-inline-block">
              <a classnamename="d-block" href="/sobre-dalat">Sobre Nosotros</a>
            </li>
            <li class="d-inline-block">
              <a classnamename="d-block" href="/contacto">Contacto</a>
            </li>
            <li class="d-inline-block">
              <a classnamename="d-block" href="/unirse-a-la-comunidad">
                Unirme a la comunidad
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copy text-center">
      DALAT - Desarrollo Accessible Latinoamericano
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
    padding-bottom: 40px;

    @include media-breakpoint-down(sm) {
      padding-top: 35px;
      padding-bottom: 20px;
    }
  }

  a {
    color: $white;
    padding: 5px 10px;
    border: 2px dashed transparent;

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
  background-color: #0e0e0e;
}

@media screen and (max-width: 768px) {
  .footer-slogan {
    padding-left: 10px !important;
  }
}
</style>
