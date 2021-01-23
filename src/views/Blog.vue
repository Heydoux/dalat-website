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
      <h2>Lo ultimo del blog</h2>
      <div class="row">
        <div class="col-md-8">
          <CardsHorizontal type="recent" size="full"></CardsHorizontal>
        </div>
        <div class="d-none d-sm-block col-md-4">
          <h2>RECOMENDADO</h2>
          <Recomendaciones></Recomendaciones>
        </div>
      </div>
      <h2 class="w-100">mas compartido</h2>
      <CardsVertical type="shared"></CardsVertical>
      <div style="display: flex; justify-content: center;">
        <button
          type="button"
          class="btn btn-primary"
          style="color: rgb(255, 255, 255); background-color: rgb(113, 62, 148); border-radius: 12px 2px; border: none;"
        >
          Mostrar más notas
        </button>
      </div>
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
  }
};
</script>
