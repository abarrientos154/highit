<template>
  <div>
    <div class="column items-center justify-center">
      <div style="width:100%">
        <div class="bordes">
          <div class="q-pb-xl q-px-md q-pt-md column items-end">
            <div class="text-h3 text-bold">CATEGORIAS</div>
            <div class="text-grey-8 text-h6">Crea las categorias de las solicitudes de tus clientes</div>
          </div>
        </div>
          <div class="column items-center justify-center">
            <q-card flat class="q-pa-md" style="width:100%">
              <div class="text-h5 text-bold">Creacion de categorias</div>
              <div class="q-mt-md text-subtitle1">Selecciona el departamento</div>
              <q-select filled v-model="form.departamento" use-input behavior="menu" input-debounce="0" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="areasOpt(form.departamento)" @filter="filterDepartments" error-message="Requerido" :error="$v.form.departamento.$error" @blur="$v.form.departamento.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <div class="q-mt-sm text-h6">Selecciona un Area</div>
              <div class="q-mt-sm text-subtitle1">Listado de Areas</div>
              <q-select filled v-model="form.area" use-input behavior="menu" input-debounce="0" :options="areas" map-options option-label="name" emit-value option-value="_id" @input="cargosOpt(form.area)" @filter="filterAreas" error-message="Requerido" :error="$v.form.area.$error" @blur="$v.form.area.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <div class="q-mt-sm text-h6">Selecciona un Cargo</div>
              <div class="q-mt-sm text-subtitle1">Listado de Cargos</div>
              <q-select filled v-model="form.cargo" use-input behavior="menu" input-debounce="0" :options="cargos" map-options option-label="name" emit-value option-value="_id" @filter="filterCharges" error-message="Requerido" :error="$v.form.cargo.$error" @blur="$v.form.cargo.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <div class="text-h5 text-bold">Creacion de categorias</div>
              <div class="q-mt-md text-subtitle1">Nombre de categoria</div>
              <q-input filled v-model="form.nombre" placeholder="Ingresa el nombre de la categoria" error-message="Requerido" :error="$v.form.nombre.$error" @blur="$v.form.nombre.$touch()"/>

              <div class="q-pa-md column items-center justify-center">
                <q-btn no-caps class="q-py-xs" color="primary" text-color="white" label="Crear nueva categoria" @click="guardar_categoria()" style="width:40%" />
              </div>
            </q-card>
            <q-card flat style="width:100%">
              <Tabla titulo="Listado de Categorias" ref="latabla3" :editarBtn="false" :columns="column" route="categorias" :btnNew="false" />
            </q-card>
          </div>
      </div>
    </div>

  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      user: {},
      form: {},
      departamentos: [],
      departamentos2: [],
      lista: {},
      areas: [],
      areas2: [],
      cargos: [],
      cargos2: [],
      column: [
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' },
        { name: 'nombre', field: 'nombre', label: 'Nombre', align: 'left' },
        { name: 'departamentoName', field: 'departamentoName', label: 'Departamento Asociado', align: 'left' }
      ]
    }
  },
  validations: {
    form: {
      departamento: { required },
      nombre: { required },
      area: { required },
      cargo: { required }

    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getDepartamentos()
          this.obtener_categorias()
        }
      })
    },
    guardar_categoria () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.company_id = this.user.empresa
        this.$api.post('categoria', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Categoria Guardada con Exito',
              color: 'positive'
            })
            this.form.departamento = ''
            this.form.nombre = ''
            this.form.area = ''
            this.form.cargo = ''
            this.$v.form.departamento.$reset()
            this.$v.form.nombre.$reset()
            this.$v.form.area.$reset()
            this.$v.form.cargo.$reset()
            this.obtener_categorias()
            this.$refs.latabla3.getRecord()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
          this.departamentos2 = [...this.departamentos]
        }
      })
    },
    areasOpt (id) {
      this.$api.get('areas/' + id).then(res => {
        if (res) {
          this.areas = res
          this.areas2 = [...this.areas]
        }
      })
    },
    cargosOpt (id) {
      this.$api.get('cargos/' + id).then(res => {
        if (res) {
          this.cargos = res
          this.cargos2 = [...this.cargos]
        }
      })
    },
    obtener_categorias () {
      this.$api.get('categorias/' + this.user.empresa).then(res => {
        if (res) {
          this.lista = res
        }
      })
    },
    filterDepartments (val, update) {
      if (val === '') {
        update(() => { this.departamentos = this.departamentos2 })
        return
      }
      update(() => { this.departamentos = this.departamentos2.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    filterAreas (val, update) {
      if (val === '') {
        update(() => { this.areas = this.areas2 })
        return
      }
      update(() => { this.areas = this.areas2.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    filterCharges (val, update) {
      if (val === '') {
        update(() => { this.cargos = this.cargos2 })
        return
      }
      update(() => { this.cargos = this.cargos2.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
}
</style>
