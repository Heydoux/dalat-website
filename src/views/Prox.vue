<template>
  <div class="home">
    <Navbar></Navbar>
    <main id="mainContent" class="container">
      <div class="row h-100 align-items-center">
        <div class="col-md-6 order-md-2 mb-3">
          <Banner></Banner>
        </div>
        <div class="col-md-6 order-md-1">
          <h1 class="mb-5">
            Desarrollo Accesible Latinoamericano
          </h1>
          <p class="mb-5 subtitle">
            Comunidad de profesionales en accesibilidad e interesados en la
            materia en Latinoamerica.
            <br>
            Podés encontrarnos en las redes sociales.
          </p>
          <ul class="d-inline-block list-unstyled lista" role="list">
            <li class="d-inline-block ">
              <a
                href="https://dalat-a11y.slack.com/"
                target="_blank"
                rel="noreferrer"
                class="anchor"
                aria-label="Encontranos en Slack"
              >
                <img
                  src="@/assets/images/form/slack-icon.png"
                  alt=""
                  class="icon"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li class="d-inline-block">
              <a
                href="https://www.instagram.com/dalatcomunidad/"
                target="_blank"
                rel="noreferrer"
                class="anchor"
                aria-label="Instagram"
              >
                <img
                  src="@/assets/images/form/Instagram-icon.png"
                  alt=""
                  class="icon"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li class="d-inline-block">
              <a
                href="https://www.linkedin.com/company/dalatcomunidad/"
                target="_blank"
                rel="noreferrer"
                class="anchor"
                aria-label="Linkedin"
              >
                <img
                  src="@/assets/images/form/linkedin-icon.png"
                  alt=""
                  class="icon"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li class="d-inline-block">
              <a
                href="https://www.facebook.com/dalatcomunidad"
                target="_blank"
                rel="noreferrer"
                class="anchor"
                aria-label="Facebook"
              >
                <img
                  src="@/assets/images/form/facebook-icon.png"
                  alt=""
                  class="icon"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from "@/components/Banner";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Banner
  }
};
</script>

<style scoped lang="scss">
  #mainContent {
    height: calc(100vh - 340.2px);

    ul {
      li {
        margin-right: 1rem;
      }
    }
  }
@media screen and (max-width: 768px) {
  .home {
    h1 {
      font-size: 35px;
      margin-bottom: 2rem !important;
    }

    p {
      font-size: 18px;
    }

    h2 {
      margin-bottom: 1rem !important;
    }
  }
}
</style>
