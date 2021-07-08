<template>
  <div>
    <article v-for="(article, index) in articles" v-bind:key="index">
      <a
        href=""
        class="d-inline-block w-100"
        :aria-labelledby="'blog-title-' + index"
        :aria-describedby="' blog-time-' + index"
      >
        <div class="card-aspect card">
          <div class="imgs-block align-items-center">
            <div
              v-for="(autor, index) in article.data().checkedProf"
              v-bind:key="index"
            >
              <img v-if="index < 2" :src="autor" class="imagen" alt="" />
              <div v-else>
                <span
                  v-if="
                    index == Object.keys(article.data().checkedProf).length - 1
                  "
                >
                  +{{ index + 1 - 2 }}
                </span>
              </div>
            </div>
          </div>
          <div class="text-block">
            <h3 :id="'blog-title-' + index">{{ article.data().title }}</h3>
            <p class="lectura card-text">
              <span class="lectura" aria-hidden="true">
                Tiempo de lectura: {{ article.data().readingTime }}’
              </span>
              <span class="sr-only" :id="'blog-time-' + index">
                Tiempo de lectura: {{ article.data().readingTime }} minutos
              </span>
            </p>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "Recomendaciones",
  props: {},
  data() {
    return {
      articles: [],
      profesionales: [],
      checkedProfs: []
    };
  },
  firestore() {
    return {
      profesionales: db.collection("profesionales")
    };
  },
  methods: {},
  created() {
    var articlesRef = db.collection("articles");
    articlesRef
      .where("recomendado", "==", true)
      .limit(3)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data().checkedProfs);
          /*if (doc.data().checkedProf.length > 2) {
            this.checkedProfs.push("/img/imagotipo.583e5cd4.svg");
          } else {
            doc.data().checkedProf.forEach( element => {
              this.checkedProfs.push(element);
            });
          }*/
          this.articles.push(doc);
        });
      });
  }
};
</script>

<style scoped lang="scss">
.imgs-block {
  display: flex;
  width: 33.33%;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  div:nth-child(1) {
    img {
      border: 2px solid $orange;
    }
  }

  div:nth-child(2) {
    img {
      border: 2px solid $blue;
      margin-left: -10px;
    }
  }

  span {
    font-size: 1rem;
    margin-left: 0.5rem;
    font-weight: bold;
  }
}

.text-block {
  width: 66.66%;
}

h3 {
  margin-top: 1.016vh;
  color: $black;
  font-size: 18px;
  font-weight: 600;
}

.card-aspect {
  border: none;
  display: flex;
  flex-direction: row;
  background-color: $grey;
  padding: 15px;
  border: 2px solid #d6d6d6;
  border-radius: 12px 2px;

  .lectura {
    color: $dark-grey;
    font-size: 14px;
    font-weight: 600;
    text-align: start;
  }
}
</style>
