<template>
  <div class="profesionales h-100">
    <div
      class="py-3 px-5 container h-100 justify-content-center align-items-center"
    >
      <h3 class="d-inline-block">Profesionales</h3>
      <button @click="addNew" class="btn btn-primary float-right">
        Add Profesional
      </button>
      <table class="table-responsive mt-5 w-100">
        <thead>
          <tr>
            <th class="w-25 pb-3 pr-2">NOMBRE</th>
            <th class="w-25 pr-2">APPELLIDO</th>
            <th class="w-25 pr-2">MODIFICAR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(profesional, index) in profesionales" v-bind:key="index">
            <td class="w-25 py-3">
              {{ profesional.nombre }}
            </td>
            <td class="w-25 py-3 text-uppercase">
              {{ profesional.appellido }}
            </td>
            <td class="w-25">
              <button
                class="btn btn-primary"
                @click="editProfesional(profesional)"
              >
                Modificar
              </button>
              <button
                class="btn btn-danger ml-2"
                @click="deleteProfesional(profesional)"
              >
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="profesional"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">
              Crear Profesional
            </h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">
              Edit Profesional
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
            <div class="row">
              <!-- main profesional -->
              <div class="col-md-12">
                <div class="form-group">
                  <label for="profesional_nombre">Profesional Nombre</label>
                  <input
                    id="profesional_nombre"
                    type="text"
                    placeholder="Nombre Profesional"
                    v-model="profesional.nombre"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="profesional_appellido">
                    Profesional Appellido
                  </label>
                  <input
                    id="profesional_appellido"
                    type="text"
                    placeholder="Appellido Profesional"
                    v-model="profesional.appellido"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="profesional_url">Profesion url perfil</label>
                  <input
                    id="profesional_url"
                    type="url"
                    placeholder="URL profesional link"
                    v-model="profesional.link"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="titulo">Titulo profesion</label>
                  <input
                    id="titulo"
                    type="url"
                    placeholder="Diseño UX/UI"
                    v-model="profesional.titulo"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="profesional_image">
                    Profesional Image (cargar imagen cuadrada)
                  </label>
                  <input
                    id="profesional_image"
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>
                <div class="p-1">
                  <div class="img-wrapp">
                    <img :src="profesional.photoUrl" alt="" width="80px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              @click="addProfesional"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Guardar cambios
            </button>
            <button
              @click="updateProfesional"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Aplicar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Profesional",
  props: {
    msg: String
  },
  data() {
    return {
      profesionales: [],
      profesional: {
        nombre: null,
        appellido: null,
        photoUrl: null,
        link: null,
        titulo: null,
        date: null
      },
      modal: null
    };
  },
  firestore() {
    return {
      profesionales: db.collection("profesionales")
    };
  },
  methods: {
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("profesionales/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          () => {},
          () => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.profesional.photoUrl = downloadURL;
              console.log("File available at: ", downloadURL);
            });
          }
        );
      }
    },
    reset() {
      this.profesional = {
        nombre: "",
        appellido: "",
        photoUrl: "",
        link: "",
        titulo: ""
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#profesional").modal("show");
    },
    updateProfesional() {
      this.$firestore.profesionales
        .doc(this.profesional.id)
        .update(this.profesional);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
      $("#profesional").modal("hide");
    },
    editProfesional(profesional) {
      this.modal = "edit";
      this.profesional = profesional;
      $("#profesional").modal("show");
    },
    deleteProfesional(profesional) {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podrás volver atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!"
      }).then(result => {
        if (result.value) {
          this.$firestore.profesionales.doc(profesional.id).delete();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Borrado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    addProfesional() {
      this.profesional.date = new Date();
      this.$firestore.profesionales.add(this.profesional);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profesional creado con éxito",
        showConfirmButton: false,
        timer: 1500
      });
      $("#profesional").modal("hide");
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
</style>
