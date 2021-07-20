<template>
  <div class="contacto">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <h1
        style="display: flex; justify-content: center; color: rgb(10, 48, 85);"
      >
        Contacto
      </h1>
      <Banner></Banner>
      <Form></Form>
      <Fin></Fin>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import Form from "@/components/Form";
import Fin from "@/components/Fin";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Banner,
    Form,
    Fin
  },
  metaInfo() {
    return {
      title: "Contacto - DALAT Comunidad",
      meta: [
        { property: "og:title", content: "Contacto" },
        { property: "og:site_name", content: "Dalat Comunidad" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://dalatcomunidad.org/contacto" },
        {
          property: "og:image",
          content: "https://dalatcomunidad.org/img/grupodepersonas-1.png"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.sobre-dalat h2 {
  font-weight: 600;
}
</style>
