<template>
  <div class="blog">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <div style="display: flex; align-items: center; justify-content: center;">
        <img class="d-none d-sm-block" src="@/assets/images/Grupo.png" alt="" />
        <h1 style="color: rgb(10, 48, 85); margin: 0px 0px 0px 5vw;">Blog</h1>
        <img
          class="d-none d-sm-block"
          src="@/assets/images/nuevos-personajes.png"
          alt=""
        />
      </div>
      <div class="row">
        <div class="col-md-8">
          <h2 class="text-uppercase mb-4">Lo ultimo del blog</h2>
          <CardsHorizontal type="date" size="full"></CardsHorizontal>
        </div>
        <div class="d-none d-sm-block col-md-4">
          <h2 class="text-uppercase mb-4">RECOMENDADO</h2>
          <Recomendaciones></Recomendaciones>
        </div>
      </div>
      <h2 class="w-100 text-uppercase mb-4">mas compartido</h2>
      <CardsVertical type="shared" limit="6" load="more"></CardsVertical>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import CardsVertical from "@/components/CardsVertical";
import CardsHorizontal from "@/components/CardsHorizontal";
import Recomendaciones from "@/components/Recomendaciones";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Recomendaciones,
    CardsVertical,
    CardsHorizontal
  },
  data() {
    return {
      start: 3,
      end: 8,
      step: 6
    };
  },
  metaInfo() {
    return {
      title: "Dalat Blog",
      meta: [
        { property: "og:title", content: "Dalat Blog" },
        { property: "og:site_name", content: "Dalat Comunidad" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://dalatcomunidad.org/blog" },
        {
          property: "og:image",
          content: "https://dalatcomunidad.org/img/blogpage.png"
        }
      ]
    };
  }
};
</script>
