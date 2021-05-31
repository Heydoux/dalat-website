<template>
  <div class="articlemodify h-100">
    <div
      class="py-3 px-5 container h-100 justify-content-center align-items-center"
    >
      <h3 class="mb-4">Modificar articulo</h3>
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
          <div class="form-group">
            <button id="btn-update" @click="updateData" class="btn btn-primary">
              Modificar
            </button>
            <button @click="deleteArticle(article)" class="ml-3 btn btn-danger">
              Borrar
            </button>
          </div>
          <div class="form-check mt-4">
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
          <div class="form-group mt-4">
            <label for="articleTag" class="font-weight-bold text-uppercase">
              Etiqueta (Terminar con coma o enter)
            </label>
            <input
              id="articleTag"
              type="text"
              @keyup.188="addTag"
              @keyup.13="addTag"
              placeholder="Articulo etiquetas"
              v-model="tag"
              class="form-control"
            />
            <div class="d-flex">
              <p v-for="tag in article.tags" :key="tag.index">
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
              <input
                id="articleThubnailAlt"
                type="text"
                placeholder="Miniatura alt texto"
                v-model="article.altthumbnail"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="articleExcerpt" class="font-weight-bold text-uppercase">
              Extracto del articulo
            </label>
            <p>
              Total Restante:
              <span
                v-bind:class="{ 'text-danger font-weight-bold': generatErr }"
              >
                {{ totalRemainCount }}
              </span>
            </p>
            <textarea
              id="articleExcerpt"
              type="text"
              placeholder="Extracto del articulo"
              v-model="article.excerpt"
              class="form-control"
              rows="10"
              v-on:keyup="liveCountDown"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="successUpdate"
      tabindex="-1"
      role="dialog"
      aria-labelledby="successUpdateLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successUpdateLabel">
              Articulo actualizado
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
            El articulo fue modificado exitosamente ;)
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
import "./../assets/js/quill-alt-image.js";

Quill.register({ "formats/video": Video });

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
        urlTitle: null,
        altthumbnail: null
      },
      activeItem: null,
      activeImg: null,
      tag: null,
      limitMaxCount: 140,
      totalRemainCount: 140,
      generatErr: false,
      saveExcerpt: null
    };
  },
  editorSettings: {
    modules: {
      Video: {}
    }
  },
  methods: {
    updateData() {
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
      this.article.excerpt = this.saveExcerpt;
      this.article.urlTitle = this.article.title
        .replace(" ", "-")
        .toLowerCase();
      if (this.toUpdate) {
        let image = fb.storage().refFromURL(this.activeImg);
        console.log(image);
        image
          .delete()
          .then(() => {
            console.log("image deleted");
            db.collection("articles")
              .doc(this.activeItem)
              .update(this.article)
              .then(() => {
                console.log("Document successfully updated!");
                $("#successUpdate").modal("show");
              })
              .catch(error => {
                console.error("Error updating document: ", error);
              });
          })
          .catch(function(error) {
            console.log("An error occured: ", error);
          });
      } else {
        db.collection("articles")
          .doc(this.activeItem)
          .update(this.article)
          .then(() => {
            console.log("Document successfully updated!");
            $("#successUpdate").modal("show");
          })
          .catch(error => {
            console.error("Error updating document: ", error);
          });
      }
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    deleteArticle(doc) {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podrás volver atrás!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!"
      }).then(result => {
        if (result.value) {
          if (this.activeImg != null) {
            let image = fb.storage().refFromURL(this.activeImg);
            image
              .delete()
              .then(() => {
                console.log("image deleted");
              })
              .catch(function(error) {
                console.log("An error occured: ", error);
              });
          }
          db.collection("articles")
            .doc(doc.id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Borrado exitosamente",
                showConfirmButton: false,
                timer: 1500
              });
              this.$router.push({ name: "articlelist" });
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error borrando el documento"
              });
              this.$router.push({ name: "articlelist" });
            });
        }
      });
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
      this.activeImg = this.article.image;
      this.toUpdate = true;
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
    },
    liveCountDown() {
      this.totalRemainCount = this.limitMaxCount - this.article.excerpt.length;
      if (this.totalRemainCount <= 0) {
        this.saveExcerpt = this.article.excerpt.substring(1, 140);
      } else {
        this.saveExcerpt = this.article.excerpt;
      }
      this.generatErr = this.totalRemainCount > 0 ? false : true;
    }
  },
  created() {
    /* if data was sent through router-link display it */
    if (this.$route.params.data) {
      this.article = this.$route.params.data;
      this.activeItem = this.article.id;
      this.activeImg = this.article.image;
      this.saveExcerpt = this.article.excerpt;
    }
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
</style>
