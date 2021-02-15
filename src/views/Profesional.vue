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
            <h5 class="modal-title" id="editLabel">Edit Profesional</h5>
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
                  <label for="profesional_url">Profesional url perfil</label>
                  <input
                    id="profesional_url"
                    type="url"
                    placeholder="URL profesional link"
                    v-model="profesional.link"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="profesional_image">Profesional Image</label>
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
        link: null
      },
      modal: null,
      activeItem: null
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
        link: ""
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#profesional").modal("show");
    },
    updateProfesional() {
      this.$firestore.profesionales.doc(this.activeItem).update(this.profesional);
      Toast.fire({
        type: "success",
        title: "Updated successfully"
      });
      $("#profesional").modal("hide");
    },
    editProfesional(profesional) {
      this.modal = "edit";
      this.profesional = profesional;
      this.activeItem = profesional.id;
      $("#profesional").modal("show");
    },
    deleteProfesional(doc) {
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
          this.$firestore.profesionales.doc(doc.id).delete();
          Toast.fire({
            type: "success",
            title: "Borrado exitosamente"
          });
        }
      });
    },
    addProfesional() {
      this.$firestore.profesionales.add(this.profesional);
      Toast.fire({
        type: "success",
        title: "Profesional creado con éxito"
      });
      $("#profesional").modal("hide");
    }
  },
  created() {
    db.collection("profesionales")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.profesionales.push(doc);
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
