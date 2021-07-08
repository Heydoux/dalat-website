<template>
  <div class="articleList h-100">
    <div
      class="py-3 px-5 container h-100 justify-content-center align-items-center"
    >
      <h3>Articulos</h3>
      <table class="table-responsive mt-5 w-100">
        <thead>
          <tr>
            <th class="w-50 pb-3 pr-2">TITULO</th>
            <th class="pr-2">RECOMENDADO</th>
            <th class="pr-2">MODIFICAR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" v-bind:key="index">
            <td v-if="index % 2" class="w-50 py-3">
              {{ article.data().title }}
            </td>
            <td v-else class="w-50 py-3 bg-light">
              {{ article.data().title }}
            </td>
            <!--
            <td v-if="index % 2">{{ article.data().content }}</td>
            <td v-else class="bg-light">{{ article.data().content }}</td>
            -->
            <td v-if="index % 2" class="py-3 text-center">
              {{ article.data().recomendado ? "Sí" : " " }}
            </td>
            <td v-else class="py-3 bg-light text-center">
              {{ article.data().recomendado ? "Sí" : " " }}
            </td>
            <td>
              <button @click="modifyArticle(article)" class="btn btn-primary">
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "ArticleList",
  props: {
    msg: String
  },
  data() {
    return {
      articles: [],
      article: {}
    };
  },
  methods: {
    modifyArticle(article) {
      this.article = article.data();
      this.article.id = article.id;
      this.$router.push({
        name: "articlemodify",
        params: { data: this.article }
      });
    }
  },
  created() {
    db.collection("articles")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.articles.push(doc);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn-primary {
  background-color: $blue;
  border-color: $blue;
}

.btn-primary:hover {
  background-color: $blue;
  border-color: $blue;
  text-decoration: underline;
}
</style>
