<template>
  <div class="sobre-dalat">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <h1
        style="display: flex; justify-content: center; color: rgb(10, 48, 85);"
      >
        Sobre nosotros
      </h1>
      <Banner></Banner>
      <div class="sobre-dalat container">
        <div class="col">
          <p>
            Somos una comunidad que tiene como objetivo promover contenido
            técnico abierto y gratuito en español sobre accesibilidad en
            internet. Desarrollamos nuestros objetivos pensando en personas
            usuarias. <br />Impulsamos y apoyamos proyectos legislativos sobre
            la materia y asesoramos sobre cómo brindar capacitaciones,
            seminarios y eventos físicos o digitales. Somos una organización sin
            fines de lucro que comenzó en 2019.
          </p>
          <h2 class="text-uppercase">Nos especializamos en:</h2>
          <p>Definir listado</p>
          <h2 class="text-uppercase">Convenios</h2>
          <p>Definir listado</p>
          <h2 class="text-uppercase">Proyectos</h2>
          <p>Definir listado</p>
          <h2 class="text-uppercase">Profesionales</h2>
          <CardProfessional></CardProfessional>
          <h2 class="text-uppercase">Comunidades que son parte</h2>
          <p>Definir listado</p>
        </div>
      </div>
      <Fin></Fin>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import CardProfessional from "@/components/CardProfessional";
import Fin from "@/components/Fin";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Banner,
    CardProfessional,
    Fin
  }
};
</script>

<style scoped lang="scss">
.sobre-dalat h2 {
  font-weight: 600;
}
</style>
