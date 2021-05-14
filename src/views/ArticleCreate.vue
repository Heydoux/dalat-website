<template>
  <div class="articlecreate h-100">
    <div
      class="py-3 px-5 container h-100 justify-content-center align-items-center"
    >
      <h3 class="mb-5">Crear nuevo articulo</h3>
      <div class="blog-test row">
        <div class="col-md-9">
          <div class="form-group">
            <label for="articleTitle" class="font-weight-bold text-uppercase">
              Titulo del articulo
            </label>
            <input
              id="articleTitle"
              type="text"
              placeholder="Titulo del articulo"
              v-model="article.title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="articleContent" class="font-weight-bold text-uppercase">
              Contenido
            </label>
            <vue-editor
              id="articleContent"
              v-model="article.content"
            ></vue-editor>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group pb-3 border-bottom ">
            <button @click="saveData" class="btn btn-primary">
              CREAR
            </button>
          </div>
          <div class="form-check pb-3 border-bottom">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="article.recomendado"
            />
            <label class="form-check-label" for="exampleCheck1">
              Articulo recomendado
            </label>
          </div>
          <div class="form-group py-3 border-bottom">
            <label for="articleTag" class="font-weight-bold text-uppercase">
              Etiqueta (Terminar con coma)
            </label>
            <input
              id="articleTag"
              type="text"
              @keyup.188="addTag"
              placeholder="Articulo etiquetas"
              v-model="tag"
              class="form-control"
            />
            <div class="d-flex mt-3">
              <p v-for="tag in article.tags" :key="tag.index" class="mb-0">
                <span class="p-1">{{ tag }}</span>
                <img
                  @click="removeTag(tag)"
                  src="@/assets/images/admin/close.svg"
                  alt=""
                  class="icon-remove"
                  width="16"
                />
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="product_image" class="font-weight-bold text-uppercase">
              Miniatura de la publicación
            </label>
            <div class="fakefile">
              <input
                type="file"
                @change="uploadImage"
                class="form-control"
                required
              />
              <button class="btn btn-primary">Charger une image</button>
            </div>
            <div class="img-wrapp mt-3">
              <img :src="article.image" alt="" width="100%" />
            </div>
          </div>
          <div class="form-group">
            <label for="articleExcerpt" class="font-weight-bold text-uppercase">
              Extracto del articulo
            </label>
            <textarea
              id="articleExcerpt"
              type="text"
              placeholder="Extracto del articulo"
              v-model="article.excerpt"
              class="form-control"
              rows="10"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="successCreate"
      tabindex="-1"
      role="dialog"
      aria-labelledby="vLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successCreateLabel">
              Nuevo articulo creado
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            El articulo fue creado exitosamente ;)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { VueEditor, Quill } from "vue2-editor";
import { Video } from "./../assets/js/quill-video-resize.js";

Quill.register({ "formats/video": Video });

/*import VideoResize from "quill-video-resize-module";

Quill.register("modules/VideoResize", VideoResize);*/

export default {
  name: "ArticleCreate",
  props: {},
  components: {
    VueEditor
  },
  data() {
    return {
      toUpdate: false,
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
      activeItem: null,
      tag: null
    };
  },
  editorSettings: {
    modules: {
      Video: {}
    }
  },
  methods: {
    saveData() {
      this.article.date = new Date();
      const paragraphs = document.querySelectorAll(".ql-editor p");
      var count = 0;
      for (var i = 0; i < paragraphs.length; i++) {
        // Split the innerHtml of the current paragraph to count the words.
        count += paragraphs[i].innerHTML.split(" ").length;
      }
      var readingTime = Math.round(count / 270);
      if (readingTime < 1) {
        this.article.readingTime = 1;
      } else {
        this.article.readingTime = readingTime;
      }
      this.article.urlTitle = this.article.title
        .replace(" ", "-")
        .toLowerCase();
      db.collection("articles")
        .add(this.article)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          $("#successCreate").modal("show");
          this.reset();
        })
        .catch(function(error) {
          console.error("Error adding document in database: ", error);
        });
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    addTag() {
      this.tag = this.tag.replace(",", "");
      this.article.tags.push(this.tag);
      this.tag = "";
    },
    removeTag(tag) {
      for (var i = 0; i < this.article.tags.length; i++) {
        if (this.article.tags[i] === tag) {
          this.article.tags.splice(i, 1);
        }
      }
    },
    uploadImage(e) {
      let file = e.target.files[0];
      var storageRef = fb
        .storage()
        .ref("articles/" + Math.random() + "_" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.article.image = downloadURL;
            console.log("File available at: ", downloadURL);
          });
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.articlecreate {
  .btn-primary {
    background-color: $blue;
    border-color: $blue;
  }

  .btn-primary:hover {
    background-color: $blue;
    border-color: $blue;
    text-decoration: underline;
  }

  .quillWrapper {
    height: 500px;
  }

  .fakefile {
    position: relative;

    input {
      position: relative;
      text-align: right;
      -moz-opacity: 0;
      opacity: 0;
      z-index: 2;
    }

    button {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }
  }
}
</style>
