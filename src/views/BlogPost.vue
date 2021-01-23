<template>
  <div class="blogpost">
    <Navbar></Navbar>
    <main id="mainContent" class="row">
      <div class="d-flex routes col-md-12">
        <router-link to="/">Home</router-link>
        <p class="px-2">></p>
        <router-link to="/blog">Blog</router-link>
        <p class="px-2">></p>
        <p class="font-weight-bold">{{ this.article.title }}</p>
      </div>
      <div class="col-md-2">
        <p>Tiempo de lectura:<br />{{ this.article.readingTime }} Minutos</p>
      </div>
      <div class="blog-content col-md-8">
        <img :src="article.image" alt="" width="100%" />
        <p>{{ this.article.title }}</p>
        <p>{{ this.article.excerpt }}</p>
        <div id="content"></div>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-12">
        <h3 class="font-weight-bold">Otros que te pueden interesar</h3>
        <CardsHorizontal type="shared" size="half"></CardsHorizontal>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import CardsHorizontal from "@/components/CardsHorizontal";
import { db } from "../firebase";

// @ is an alias to /src
export default {
  name: "Blogpost",
  components: {
    CardsHorizontal
  },
  data() {
    return {
      article: {
        title: null,
        content: null,
        recomendado: false,
        tags: [],
        image: null,
        date: null,
        shared: 0,
        excerpt: null,
        readingTime: 0,
        urlTitle: null
      },
      content: null
    };
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let articleId = urlParams.get("articleId");
    db.collection("articles")
      .doc(articleId)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.id, " => ", querySnapshot.data());
        this.article = querySnapshot.data();
        this.content = $(this.article.content);
        $("#content").append(this.content);
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }
};
</script>

<style scoped lang="scss">
.routes {
  a {
    text-decoration: underline;
    color: $blue;
    font-weight: bold;
  }

  p {
    color: $blue;

    &.px-2 {
      transform: scale(1.3);
    }
  }
}

h3 {
  color: $blue;
}
</style>
