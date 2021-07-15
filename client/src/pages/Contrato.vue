<template>
  <div>
    <div class="q-pa-xl column items-center justify-center">
      <div class="" style="width:60%">
        <q-card class="" style="width:100%; height:200px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Contratos</div>
            <div class="text-h5 text-right">Administra el tiempo de trabajo con tus clientes</div>
          </q-card-section>
        </q-card>
          <div class="column items-center justify-center">
            <q-card flat class="q-pl-md q-mt-md" style="width:100%">
              <div class="text-h5 text-bold">Creacion de contratos</div>
              <div class="q-mt-md text-subtitle1">introduzca el nombre del contrato</div>
              <q-input filled v-model="form.contrato" label="Nombre del contrato"
               error-message="Requerido" :error="$v.form.contrato.$error" @blur="$v.form.contrato.$touch()"
               />
                <div class="q-pa-md column items-center justify-center">
                  <q-btn color="primary" text-color="white" label="Crear nuevo contrato" @click="guardar_contrato()" style="width:40%" />
                </div>
            </q-card>

            <div class="q-mt-md text-h6 text-grey">Selecciona un contrato disponible para agregar SLA´S</div>
            <q-card style="width:100%">
                <q-list separator>
                  <q-item v-for="(item, index) in lista" :key="index" class="text-grey text-bold">
                    <div class="row justify-center items-center" style="width: 100%" >
                      <q-item-section>{{index+1}} {{item.contrato}}</q-item-section>
                      <q-item-section>{{item.fechaCreacion}}</q-item-section>
                    </div>
                      <div class="justify-center items-center" style="width:100px">
                        <q-btn flat color="grey" icon="edit" round dense @click="showModalEditar = true, id_contrato = item._id, nuevo = item.contrato " />
                        <q-btn flat color="grey" icon="delete" round dense @click="showModalEliminar = true, id_contrato = item._id"/>
                      </div>
                  </q-item>
                  <div v-if="lista.length < 1" class="row justify-center text-caption q-mt-md">No hay Contratos actualmente</div>
                </q-list>
            </q-card>
          </div>
          <div class="q-mt-md text-h5 text-bold">Selecciona el contrato</div>
          <div class="q-mt-md text-h6 text-grey">Selecciona el contrato para asignar tu requerimiento</div>
          <div class="column items-center justify-center">
            <div class="row no-wrap q-py-md q-px-md q-gutter-md">
              <div v-for="(btn, index) in lista" :key="index" >
                <q-btn no-caps class="q-px-md" :label="btn.contrato" :color="selecBoton === btn ? 'grey-6' : 'blue-grey-11'" text-color="blue-grey-9"
                @click="Botonselec(btn, 'cat')" />
              </div>
            </div>
         </div>
         <div class="q-mt-md text-subtitle1">Nombre requerimiento</div>
          <q-input filled v-model="form2.nombre" label="Nombre de SLA"
          error-message="Requerido" :error="$v.form2.nombre.$error" @blur="$v.form2.nombre.$touch()"
           />
          <div class="row">
          <div class="colum">
            <div class="q-mt-md text-subtitle1">Tiempo que tomara</div>
            <div class="row">
              <q-input type="number" filled v-model="form2.tiempo"
              error-message="Requerido" :error="$v.form2.tiempo.$error" @blur="$v.form2.tiempo.$touch()" style="width: 120px"/>
              <div class="q-mt-lg">{{"Horas"}}</div>
            </div>
          </div>
          <q-space />
          <div class="colum">
            <div class="q-mt-md text-subtitle1">Seleccione el color</div>
            <q-select filled v-model="color" :options="options" style="width:170px"
            error-message="Requerido" :error="$v.color.$error" @blur="$v.color.$touch()"/>
          </div>
          </div>
          <div class="q-pa-md column items-center justify-center">
            <q-btn color="primary" text-color="white" label="Crear nueva SLA" @click="guardar_SLA()" style="width:40%" />
          </div>
          <div class="q-mt-md text-h5 text-bold">Listados de SLA´s</div>
          <div class="q-mt-md text-h6 text-grey">Listados de SLAs creados</div>
          <q-card style="width:100%">
              <q-list bordered separator>
                <q-item v-for="(item, index) in lista2" :key="index" class="text-grey text-bold">
                  <div class="row justify-center items-center" style="width: 100%" >
                    <div class="row">
                      <q-btn flat color="grey" icon="delete" round dense @click="showModalEliminar2 = true, id_sla = item._id"/>
                    </div>
                    <q-item-section> {{item.nombre}}</q-item-section>
                    <q-item-section>{{item.tiempo}} {{"Horas"}}</q-item-section>
                    <div :class="item.color2 === 'blue' ? 'bg-blue' : item.color2 === 'red' ? 'bg-red' : 'bg-green'" style="width:20px; height:20px;border-radius:100%"></div>
                  </div>
                </q-item>
                <div v-if="lista.length < 1" class="row justify-center text-caption q-mt-md">No hay Requerimientos actualmente</div>
              </q-list>
          </q-card>
      </div>
    </div>
    <q-dialog v-model="showModalEditar">
      <q-card>
        <q-card-section>
        <div class="row">
         <div class="text-h6">Modifica el contrato</div>
         <q-space />
          <q-btn color="red" icon="close" flat round dense v-close-popup />
        </div>
          <q-input v-model="nuevo" outlined dense class="q-mt-sm" style="width: 300px" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="blue" icon="edit" label="Modificar" push @click="modificar_contrato(id_contrato), showModalEditar = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showModalEliminar">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="text-h6">¿Estas seguro de eliminar el contrato?</div>
            <q-btn color="red" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="red" icon="delete" label="Eliminar" push @click="eliminar_contrato(id_contrato), showModalEliminar = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showModalEliminar2">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="text-h6">¿Estas seguro de eliminar el Requerimiento?</div>
            <q-btn color="red" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="red" icon="delete" label="Eliminar" push @click="eliminar_Sla(id_sla), showModalEliminar2 = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        contrato: ''
      },
      form2: {},
      lista: [],
      lista2: [],
      showModalEliminar: false,
      showModalEliminar2: false,
      selecBoton: '',
      nuevo: '',
      showModalEditar: false,
      color: '',
      options: ['Rojo', 'Azul', 'Verde']
    }
  },
  validations: {
    form: {
      contrato: { required }
    },
    form2: {
      nombre: { required },
      tiempo: { required }
    },
    color: { required }
  },
  methods: {
    guardar_contrato () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$api.post('contrato', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Contrato Guardado con Exito',
              color: 'positive'
            })
            this.obtener_contratos()
            this.form.contrato = ''
            this.$v.form.contrato.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    guardar_SLA () {
      this.$v.form2.$touch()
      this.$v.color.$touch()
      if (!this.$v.form2.$error && !this.$v.color.$error && this.form2.contrato !== '') {
        this.form2.color = this.color
        this.$api.post('sla', this.form2).then(res => {
          if (res) {
            this.$q.notify({
              message: 'SLA Guardado con Exito',
              color: 'positive'
            })
            this.obtener_Sla()
            this.form2 = {}
            this.selecBoton = ''
            this.color = ''
            this.$v.form2.$reset()
            this.$v.color.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    obtener_contratos () {
      this.$api.get('contratos').then(res => {
        if (res) {
          this.lista = res
        }
      })
    },

    obtener_Sla () {
      this.$api.get('slas').then(res => {
        if (res) {
          this.lista2 = res
          console.log(this.lista2, 'pendiente')
        }
      })
    },
    eliminar_contrato (id) {
      this.$api.delete('contrato/' + id).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Se elimino el contrato',
            color: 'positive'
          })
          this.obtener_contratos()
        }
      })
    },
    eliminar_Sla (id) {
      this.$api.delete('sla/' + id).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Se elimino el requerimiento',
            color: 'positive'
          })
          this.obtener_Sla()
        }
      })
    },
    modificar_contrato (id) {
      this.form.contrato = this.nuevo
      this.$api.put('contrato/' + id, this.form).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Contrato Modificada con exito',
            color: 'positive'
          })
          this.obtener_contratos()
          this.form.contrato = ''
        }
      })
    },
    mostrarBtn () {
      if (this.selecBoton === '') {
        return true
      } else {
        return false
      }
    },
    Botonselec (btn, text) {
      this.form2.contrato = btn._id
      if (text === 'cat') {
        this.selecBoton = btn
      }
    }

  },
  mounted () {
    this.obtener_contratos()
    this.obtener_Sla()
  }
}
</script>
<style lang="sass" scoped>
.row > div
  padding: 1px 10px
.row + .row
  margin-top: 1rem
</style>
