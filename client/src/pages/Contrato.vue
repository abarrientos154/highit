<template>
  <div>
    <div class="column items-center justify-center">
      <div style="width:100%">
        <div class="bordes">
          <div class="q-pb-xl q-px-md q-pt-md column items-end">
            <div class="text-h3 text-bold">CONTRATOS</div>
            <div class="text-grey-8 text-h6">Edición de datos de usuarios en el sistema</div>
          </div>
        </div>
          <div class="column q-pa-md items-center justify-center">
            <q-card flat style="width:100%">
              <div class="text-h5 text-bold">Creación de contratos</div>
              <div>
                <div class="q-mt-md text-subtitle1">Introduzca el nombre del contrato</div>
                <q-input filled v-model="form.contrato" label="Nombre del contrato" error-message="Requerido" :error="$v.form.contrato.$error" @blur="$v.form.contrato.$touch()"/>
              </div>
              <div>
                <div class="q-mt-md text-subtitle1">Costo por usuario</div>
                <q-input type="number" filled v-model.number="form.costo" :rules="[ v => v > 0 ]" error-message="Requerido" :error="$v.form.costo.$error" @blur="$v.form.costo.$touch()"/>
              </div>

              <div class="q-pa-md column items-center justify-center">
                <q-btn no-caps class="q-py-xs" color="primary" text-color="white" label="Crear nuevo contrato" @click="guardar_contrato()" style="width:40%" />
              </div>
            </q-card>
            <q-card style="width:100%">
              <Tabla v-if="listado" no-data-label="Sin registros" titulo="Listado de contratos" @actualizarPadre="obtener_contratos()" ref="latabla" :columns="column" route="contratos" :route_id="rol === 2 ? user.empresa : null" :btnNew="false" />
            </q-card>
          </div>
          <div class="q-pa-md">
            <div class="q-mt-md text-h5 text-bold">Selecciona el contrato</div>
            <div class="q-mt-md text-subtitle1">Selecciona el contrato para definir prioridad</div>
            <q-select filled v-model="form2.contrato" use-input behavior="menu" input-debounce="0" :options="lista" map-options option-label="contrato" emit-value option-value="_id" @filter="filterFn" :error="$v.form2.contrato.$error" @blur="$v.form2.contrato.$touch()">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          <div class="q-mt-md text-subtitle1">Definir prioridad</div>
            <q-input filled v-model="form2.nombre" label="Nombre de la prioridad"
            error-message="Requerido" :error="$v.form2.nombre.$error" @blur="$v.form2.nombre.$touch()"
            />
            <div class="row">
              <div>
                <div class="q-mt-md text-subtitle1">Tiempo de atención acordado</div>
                <div class="row">
                  <q-input type="number" filled v-model.number="form2.tiempo" min="1" :rules="[ v => v >= 1 ]" error-message="Requerido" :error="$v.form2.tiempo.$error" @blur="$v.form2.tiempo.$touch()" style="width: 120px"/>
                  <div class="q-ml-md q-mt-md">Minutos</div>
                </div>
              </div>
              <q-space />
              <div>
                <div class="q-mt-md text-subtitle1">Seleccione el color</div>
                <q-select filled v-model="color" :options="options" style="width:170px" error-message="Requerido" :error="$v.color.$error" @blur="$v.color.$touch()"/>
              </div>
            </div>
            <div class="q-pa-md column items-center justify-center">
              <q-btn no-caps class="q-py-xs" color="primary" text-color="white" label="Crear nueva prioridad" @click="guardar_SLA()" style="width:40%" />
            </div>
            <q-card style="width:100%">
              <Tabla titulo="Listado de prioridades creadas" ref="latabla2" :columns="column2" route="sla" :editarBtn="false" :selectBtn="true" :btnNew="false" :selectFlt="false"/>
            </q-card>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Tabla from '../components/TableActions'
export default {
  components: {
    Tabla
  },
  data () {
    return {
      filterBy: null,
      rol: null,
      listado: false,
      user: {},
      form: {},
      form2: {},
      column: [
        { name: 'contrato', field: 'contrato', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
      ],
      column2: [
        { name: 'nombre', field: 'nombre', label: 'Nombre', align: 'center' },
        { name: 'tiempo', field: 'tiempo', label: 'Tiempo', align: 'right', filter_type: 'false', text: 'end' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ],
      lista: [],
      lista2: [],
      color: '',
      options: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Rosado', 'Gris', 'Negro', 'Celeste', 'Anaranjado', 'Morado', 'Cafe']
    }
  },
  validations: {
    form: {
      contrato: { required },
      costo: { required }
    },
    form2: {
      contrato: { required },
      nombre: { required },
      tiempo: { required }
    },
    color: { required }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.listado = true
          this.obtener_contratos()
        }
      })
    },
    guardar_contrato () {
      this.$v.form.$touch()
      const val = this.lista.filter(v => v.contrato === this.form.contrato)
      if (!this.$v.form.$error && !val.length) {
        this.form.status = this.rol
        if (this.rol === 2) {
          this.form.company_id = this.user.empresa
        }
        this.$api.post('contrato', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Contrato Guardado con Exito',
              color: 'positive'
            })
            this.form.contrato = ''
            this.$v.form.contrato.$reset()
            this.$refs.latabla.getRecord()
            this.$refs.latabla2.getOptions()
            this.obtener_contratos()
          }
        })
      } else {
        this.$q.notify({
          message: `${val.length ? 'El nombre de este contrato ya esta registrado' : 'Faltan campos por llenar'}`,
          color: 'negative'
        })
      }
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.lista = this.lista2
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.lista = this.lista2.filter(v => v.contrato.toLowerCase().indexOf(needle) > -1)
      })
    },
    guardar_SLA () {
      this.$v.form2.$touch()
      this.$v.color.$touch()
      if (!this.$v.form2.$error && !this.$v.color.$error) {
        this.form2.color = this.color
        this.form2.status = this.rol
        if (this.rol === 2) {
          this.form2.company_id = this.user.empresa
        }
        this.$api.post('sla', this.form2).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Prioridad guardada con Exito',
              color: 'positive'
            })
            this.form2 = {
              contrato: ''
            }
            this.color = ''
            this.filterBy = null
            this.$v.form2.$reset()
            this.$v.color.$reset()
            this.$refs.latabla2.getRecord()
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
      if (this.rol === 1) {
        this.$api.get('contratos').then(res => {
          if (res) {
            this.lista = res
            this.lista2 = [...this.lista]
            this.$refs.latabla.getRecord()
            this.$refs.latabla2.getOptions()
          }
        })
      } else {
        this.$api.get('contratos_by_company/' + this.user.empresa).then(res => {
          if (res) {
            this.lista = res
            this.lista2 = [...this.lista]
            this.$refs.latabla.getRecord()
            this.$refs.latabla2.getOptions()
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
  margin-left: 2px;
}
</style>
