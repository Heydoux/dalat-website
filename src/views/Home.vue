<template>
  <div class="home">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <div style="display: inline-flex; width: 100%; align-items: end;">
        <div>
          <h1 style="color: rgb(10, 48, 85); margin: 0px 0px 1.875vw;">
            Desarrollo Accesible Latinoamericano
          </h1>
          <p style="margin-bottom: 43px;">
            Comunidad de profesionales en accesibilidad e interesados en la
            materia en Latinoamerica.
          </p>
        </div>
        <div style="width: 100%;">
          <Banner></Banner>
        </div>
      </div>
      <h2 style="margin-top: 3.359vh; font-weight: 800;">BLOG</h2>
      <p style="color: rgb(10, 48, 85); font-weight: 700;">
        Mira las notas más recientes
      </p>
      <CardsVertical type="recent"></CardsVertical>
      <h2 style="margin-top: 3.359vh; font-weight: 800;">
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
