<template>
  <div>
    <div class="row">
      <div
        v-for="(article, index) in articles"
        v-bind:key="index"
        class="mb-3 col-md-4"
      >
        <!--<a class="d-inline-block" href="/blog">-->
        <router-link
          class="d-inline-block"
          :to="{
            path: `/blog/${article.data().urlTitle}`,
            query: { articleId: article.id }
          }"
        >
          <div class="vertical-body card">
            <div class="image-wrapper-vert">
              <img
                :src="article.data().image"
                alt=""
                class="card-img-top img-fluid"
              />
            </div>
            <div class="card-body">
              <div class="categoria card-title h5">
                {{ article.data().tags[0] }}
              </div>
              <div class="card-subtitle h6">
                <h3>{{ article.data().title }}</h3>
              </div>
              <p class="bajada card-text">
                {{ article.data().excerpt }}
              </p>
              <p class="tiempo card-text">
                Tiempo de lectura: {{ article.data().readingTime }}'
              </p>
            </div>
          </div>
        </router-link>
        <!--</a>-->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "CardsVertical",
  props: ["type"],
  data() {
    return {
      articles: []
    };
  },
  created() {
    var articlesRef = db.collection("articles");
    if (this.type === "recent") {
      articlesRef
        .orderBy("date", "desc")
        .limit(3)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.articles.push(doc);
          });
        });
    } else {
      articlesRef
        .orderBy("shared", "desc")
        .limit(3)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.articles.push(doc);
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
.image-wrapper-vert {
  width: 100%;
  height: 210px;
  position: relative;
  overflow: hidden;
}

.card-img-top {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 100%;
}

.categoria {
  color: $purple;
  font-size: 14px;
  font-weight: 900;
}

h3 {
  color: $black;
  font-size: 18px;
  font-weight: 400;
}

.bajada {
  color: $dark-grey;
  font-size: 14px;
  font-weight: 400;
}

.tiempo {
  color: $dark-grey;
  font-weight: 600;
  text-align: end;
  margin: 0 auto;
}

.vertical-body {
  background-color: $grey;
  border: none;
}
</style>
