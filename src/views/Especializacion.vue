<template>
  <div class="especializacion h-100">
    <div
      class="py-3 px-5 container h-100 justify-content-center align-items-center"
    >
      <h3 class="d-inline-block">Especialización</h3>
      <button @click="addNew" class="btn btn-primary float-right">
        Add Especialización
      </button>
      <table class="table-responsive mt-5 w-100">
        <thead>
          <tr>
            <th class="w-25 pb-3 pr-2">TITULO</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(especializacion, index) in especializaciones"
            v-bind:key="index"
          >
            <td class="w-25 py-3">
              {{ especializacion.nombre }}
            </td>
            <td class="w-25 py-3 text-uppercase">
              {{ especializacion.appellido }}
            </td>
            <td class="w-25">
              <button
                class="btn btn-primary"
                @click="editEspecializacion(especializacion)"
              >
                Modificar
              </button>
              <button
                class="btn btn-danger ml-2"
                @click="deleteEspecializacion(especializacion)"
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
      id="especializacion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">
              Crear Especializacion
            </h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">
              Edit Especializacion
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
              <!-- main especializacion -->
              <div class="col-md-12">
                <div class="form-group">
                  <label for="especializacion_nombre"
                    >Especializacion Nombre</label
                  >
                  <input
                    id="especializacion_nombre"
                    type="text"
                    placeholder="Nombre Especializacion"
                    v-model="especializacion.nombre"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="especializacion_appellido">
                    Especializacion Appellido
                  </label>
                  <input
                    id="especializacion_appellido"
                    type="text"
                    placeholder="Appellido Especializacion"
                    v-model="especializacion.appellido"
                    class="form-control"
                  />
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
              @click="addEspecializacion"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Guardar cambios
            </button>
            <button
              @click="updateEspecializacion"
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
import { db } from "../firebase";

export default {
  name: "Especializacion",
  props: {
    msg: String
  },
  data() {
    return {
      especializaciones: [],
      especializacion: {
        nombre: null,
        appellido: null
      },
      modal: null
    };
  },
  firestore() {
    return {
      especializaciones: db.collection("especializaciones")
    };
  },
  methods: {
    reset() {
      this.profesional = {
        nombre: "",
        appellido: ""
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#especializacion").modal("show");
    },
    updateEspecializacion() {
      this.$firestore.especializaciones
        .doc(this.especializacion.id)
        .update(this.especializacion);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
      $("#especializacion").modal("hide");
    },
    editEspecializacion(especializacion) {
      this.modal = "edit";
      this.especializacion = especializacion;
      $("#especializacion").modal("show");
    },
    deleteEspecializacion(especializacion) {
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
          this.$firestore.especializaciones.doc(especializacion.id).delete();
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
    addEspecializacion() {
      this.$firestore.especializaciones.add(this.especializacion);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Especializacion creado con éxito",
        showConfirmButton: false,
        timer: 1500
      });
      $("#especializacion").modal("hide");
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
