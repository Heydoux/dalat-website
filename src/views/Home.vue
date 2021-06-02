<template>
  <div class="home">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <div class="row">
        <div class="col-md-8 order-md-2 mb-3">
          <Banner></Banner>
        </div>
        <div class="col-md-4 order-md-1">
          <h1 class="mb-5">
            Desarrollo Accesible Latinoamericano
          </h1>
          <p class="subtitle mb-5">
            Somos profesionales de Accesibilidad que buscan generar y divulgar
            conocimiento sobre la materia e impulsar a personas y comunidades
            latinoamericanas.
          </p>
        </div>
      </div>
      <h2 class="my-4 font-weight-bold">BLOG</h2>
      <p class="font-weight-bold" style="color: rgb(10, 48, 85);">
        Mira las notas más recientes
      </p>
      <CardsVertical type="date" limit="3"></CardsVertical>
      <h2 class="my-4 font-weight-bold">
        Lo más compartido
      </h2>
      <CardsHorizontal type="shared" size="half"></CardsHorizontal>
      <Fin></Fin>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import CardsVertical from "@/components/CardsVertical";
import CardsHorizontal from "@/components/CardsHorizontal";
import Banner from "@/components/Banner";
import Fin from "@/components/Fin";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Banner,
    CardsVertical,
    CardsHorizontal,
    Fin
  }
};
</script>

<style scoped lang="scss">
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
