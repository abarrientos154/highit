<template>
  <div>
    <div class="bordes">
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">ORGANIGRAMA</div>
        <div class="text-grey-8 text-h6">Crea los departamentos y areas de tu empreza</div>
      </div>
    </div>
    <div class="q-py-lg q-px-md">
      <div class="q-mb-lg">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de departamentos</div>
          <div>
            <div class="text-grey-8">Agregar nuevo departamento</div>
            <q-input outlined filled v-model="formDepartment.name" placeholder="Ingresa el nombre de tu departamento" error-message="Este campo es requerido" :error="$v.formDepartment.name.$error" @blur="$v.formDepartment.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" label="Crear nuevo departamento" style="width: 90%; border-radius: 5px;" @click="save(1)" no-caps/>
          </div>
        </div>
        <div>
          <Tabla titulo="Departamentos" @actualizarPadre="getDepartamentos()" ref="listaDepartamentos" :columns="column" route="departments" :editarBtn="false"/>
        </div>
      </div>
      <div class="q-mb-lg" v-if="departamentos.length">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de areas</div>
          <div>
            <div class="text-grey-8">Selecciona el departamento disponible</div>
            <q-select filled v-model="formArea.department_id" use-input behavior="menu" input-debounce="0" :options="departamentos2" map-options option-label="name" emit-value option-value="_id" @filter="filterDepartments" @input="$refs.listaAreas.selectChange(formArea.department_id) && $refs.listaAreas.filterData()" :error="$v.formArea.department_id.$error" @blur="$v.formArea.department_id.$touch()">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            <div class="text-grey-8">Agregar nueva area</div>
            <q-input outlined filled v-model="formArea.name" placeholder="Ingresa el nombre de tu nueva area" error-message="Este campo es requerido" :error="$v.formArea.name.$error" @blur="$v.formArea.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" label="Crear nueva area" style="width: 90%; border-radius: 5px;" @click="save(2)" no-caps/>
          </div>
        </div>
        <div>
          <Tabla titulo="Areas" @actualizarPadre="getAreas()" ref="listaAreas" :columns="column" route="areas" :editarBtn="false" :selectFlt="false"/>
        </div>
      </div>
      <div v-if="areas.length">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de cargos</div>
          <div>
            <div class="text-grey-8">Selecciona el area disponible</div>
            <q-select filled v-model="formCharge.area_id" use-input behavior="menu" input-debounce="0" :options="areas2" map-options option-label="name" emit-value option-value="_id" @filter="filterAreas" @input="$refs.listaCargos.selectChange(formCharge.area_id) && $refs.listaCargos.filterData()" :error="$v.formCharge.area_id.$error" @blur="$v.formCharge.area_id.$touch()">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            <div class="text-grey-8">Agregar nuevo cargo</div>
            <q-input outlined filled v-model="formCharge.name" placeholder="Ingresa el nombre del cargo" error-message="Este campo es requerido" :error="$v.formCharge.name.$error" @blur="$v.formCharge.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" label="Crear nuevo cargo" style="width: 90%; border-radius: 5px;" @click="save(3)" no-caps/>
          </div>
        </div>
        <div>
          <Tabla titulo="Cargos" @actualizarPadre="getCargos()" ref="listaCargos" :columns="column" route="charges" :editarBtn="false" :selectFlt="false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabla from '../../components/TableActions'
import { required } from 'vuelidate/lib/validators'
export default {
  components: { Tabla },
  data () {
    return {
      user: {},
      departamentos: [],
      departamentos2: [],
      areas: [],
      areas2: [],
      cargos: [],
      formDepartment: {},
      formArea: {},
      formCharge: {},
      column: [
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'cantUser', field: 'cantUser', label: 'Cantidad de Usuarios', filter_type: 'false', align: 'right', text: 'end' }
      ]
    }
  },
  validations: {
    formDepartment: {
      name: { required }
    },
    formArea: {
      name: { required },
      department_id: { required }
    },
    formCharge: {
      name: { required },
      area_id: { required }
    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    filterDepartments (val, update) {
      if (val === '') {
        update(() => { this.departamentos2 = this.departamentos })
        return
      }
      update(() => { this.departamentos2 = this.departamentos.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    filterAreas (val, update) {
      if (val === '') {
        update(() => { this.areas2 = this.areas })
        return
      }
      update(() => { this.areas2 = this.areas.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getDepartamentos()
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments').then(res => {
        if (res) {
          this.departamentos = res
          this.departamentos2 = [...this.departamentos]
          this.getAreas()
        }
      })
    },
    getAreas () {
      this.$api.get('areas').then(res => {
        if (res) {
          this.areas = res
          this.areas2 = [...this.areas]
          this.getCargos()
        }
      })
    },
    getCargos () {
      this.$api.get('charges').then(res => {
        if (res) {
          this.cargos = res
        }
      })
    },
    save (idx) {
      if (idx === 1) {
        this.$v.formDepartment.$touch()
        const val = this.departamentos.filter(v => v.name === this.formDepartment.name)
        if (!this.$v.formDepartment.$error && !val.length) {
          this.formDepartment.company_id = this.user.empresa
          this.formDepartment.cantUser = 0
          this.$api.post('register_department', this.formDepartment).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Departamento creado correctamente',
                color: 'positive'
              })
              this.getDepartamentos()
              this.$refs.listaDepartamentos.getRecord()
              this.formDepartment = {}
              this.$v.formDepartment.$reset()
            }
          })
        } else {
          this.$q.notify({
            message: !val.length ? 'Debe ingresar los datos requeridos para el registro de departamentos' : 'Este departamento ya esta registrado en el sistema',
            color: 'negative'
          })
        }
      } else if (idx === 2) {
        this.$v.formArea.$touch()
        const val = this.areas.filter(v => v.name === this.formArea.name && v.department_id === this.formArea.department_id)
        if (!this.$v.formArea.$error && !val.length) {
          this.formArea.company_id = this.user.empresa
          this.formArea.cantUser = 0
          this.$api.post('register_area', this.formArea).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Area creada correctamente',
                color: 'positive'
              })
              this.getAreas()
              this.$refs.listaAreas.getRecord()
              this.$refs.listaAreas.selectChange(null)
              this.formArea = {}
              this.$v.formArea.$reset()
            }
          })
        } else {
          this.$q.notify({
            message: !val.length ? 'Debe ingresar los datos requeridos para el registro de areas' : 'Esta area ya esta registrada en el departamento seleccionado',
            color: 'negative'
          })
        }
      } else if (idx === 3) {
        this.$v.formCharge.$touch()
        const val = this.cargos.filter(v => v.name === this.formCharge.name && v.area_id === this.formCharge.area_id)
        if (!this.$v.formCharge.$error && !val.length) {
          this.formCharge.company_id = this.user.empresa
          this.formCharge.cantUser = 0
          this.$api.post('register_charge', this.formCharge).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Cargo creado correctamente',
                color: 'positive'
              })
              this.getCargos()
              this.$refs.listaCargos.getRecord()
              this.$refs.listaCargos.selectChange(null)
              this.formCharge = {}
              this.$v.formCharge.$reset()
            }
          })
        } else {
          this.$q.notify({
            message: !val.length ? 'Debe ingresar los datos requeridos para el registro de cargos' : 'Este cargo ya esta registrado en el area seleccionada',
            color: 'negative'
          })
        }
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
}
</style>
