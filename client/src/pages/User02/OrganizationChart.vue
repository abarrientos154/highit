<template>
  <div>
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">ORGANIGRAMA</div>
        <div class="text-grey-8 text-h6">Crea los departamentos y areas de tu empreza</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7"/>
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de departamentos</div>
          <div>
            <div class="text-grey-8">Agregar nuevo departamento</div>
            <q-input dense outlined filled v-model="formDepartment.name" placeholder="Ingresa el nombre de tu departamento" error-message="Este campo es requerido" :error="$v.formDepartment.name.$error" @blur="$v.formDepartment.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary q-py-xs" text-color="white" label="Crear nuevo departamento" style="width: 90%; border-radius: 5px;" @click="save(1)" no-caps/>
          </div>
        </div>
        <div v-if="departamentos.length">
          <Tabla titulo="Departamentos" @actualizarPadre="getDepartamentos()" :columns="column" route="departments" :editarBtn="false"/>
          <!-- <q-markup-table flat>
            <thead>
              <tr>
                <th colspan="2">
                  <div class="column text-left">
                    <div class="text-h6 text-bold">Departametos</div>
                    <div class="text-secondary text-subtitle2">Listado de departamentos creados</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(departamento, index) in departamentos" :key="index">
                <td>
                  <div class="row items-center text-secondary no-wrap">
                    <q-btn flat icon="delete" size="md" round dense @click="destroy(departamento._id, 1)"/>
                    <div class="text-subtitle1">{{departamento.name}}</div>
                  </div>
                </td>
                <td class="text-right">
                  <div class="text-subtitle1 text-secondary">Cant. Usuarios: {{departamento.cantUser}}</div>
                </td>
              </tr>
            </tbody>
          </q-markup-table> -->
        </div>
      </div>
      <div class="q-mb-md" v-if="departamentos.length">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de areas</div>
          <div>
            <div class="text-grey-8">Selecciona el departamento disponible</div>
            <q-scroll-area horizontal style="height: 50px;">
              <div class="row no-wrap full-width">
                <q-btn dense v-for="(btn, index) in departamentos" :key="index" class="q-px-md q-ma-xs" :label="btn.name" :text-color="selecD === btn._id ? 'grey-3' : 'grey-6'" :color="selecD === btn._id ? 'grey-5' : 'grey-4'" @click="selecBtn(btn._id, 1)" style="min-width: 150px; border-radius: 5px;" no-caps/>
              </div>
            </q-scroll-area>
            <div v-if="$v.selecD.$error" class="text-center text-negative">Seleccion de departamento requerida</div>
          </div>
          <div>
            <div class="text-grey-8">Agregar nueva area</div>
            <q-input dense outlined filled v-model="formArea.name" placeholder="Ingresa el nombre de tu nueva area" error-message="Este campo es requerido" :error="$v.formArea.name.$error" @blur="$v.formArea.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary q-py-xs" text-color="white" label="Crear nueva area" style="width: 90%; border-radius: 5px;" @click="save(2)" no-caps/>
          </div>
        </div>
        <div v-if="areas.length">
          <Tabla titulo="Areas" @actualizarPadre="getAreas()" :columns="column" route="areas" :editarBtn="false"/>
          <!-- <q-markup-table flat>
            <thead>
              <tr>
                <th colspan="2">
                  <div class="column text-left">
                    <div class="text-h6 text-bold">Areas</div>
                    <div class="text-secondary text-subtitle2">Listado de areas creadas</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(area, index) in areas" :key="index">
                <td>
                  <div class="row items-center text-secondary no-wrap">
                    <q-btn flat icon="delete" size="md" round dense @click="destroy(area._id, 2)"/>
                    <div class="text-subtitle1">{{area.name}}</div>
                  </div>
                </td>
                <td class="text-right">
                  <div class="text-subtitle1 text-secondary">Cant. Usuarios: {{area.cantUser}}</div>
                </td>
              </tr>
            </tbody>
          </q-markup-table> -->
        </div>
      </div>
      <div v-if="areas.length">
        <div class="q-mb-md">
          <div class="text-bold text-h6">Creación de cargos</div>
          <div>
            <div class="text-grey-8">Selecciona el area disponible</div>
            <q-scroll-area horizontal style="height: 50px;">
              <div class="row no-wrap full-width">
                <q-btn dense v-for="(btn, index) in areas" :key="index" class="q-px-md q-ma-xs" :label="btn.name" :text-color="selecA === btn._id ? 'grey-3' : 'grey-6'" :color="selecA === btn._id ? 'grey-5' : 'grey-4'" @click="selecBtn(btn._id, 2)" style="min-width: 150px; border-radius: 5px;" no-caps/>
              </div>
            </q-scroll-area>
            <div v-if="$v.selecA.$error" class="text-center text-negative">Seleccion de area requerida</div>
          </div>
          <div>
            <div class="text-grey-8">Agregar nuevo cargo</div>
            <q-input dense outlined filled v-model="formCharge.name" placeholder="Ingresa el nombre del cargo" error-message="Este campo es requerido" :error="$v.formCharge.name.$error" @blur="$v.formCharge.name.$touch()"/>
          </div>
          <div class="column items-center">
            <q-btn color="primary q-py-xs" text-color="white" label="Crear nuevo cargo" style="width: 90%; border-radius: 5px;" @click="save(3)" no-caps/>
          </div>
        </div>
        <div v-if="cargos.length">
          <Tabla titulo="Cargos" @actualizarPadre="getCargos()" :columns="column" route="charges" :editarBtn="false"/>
          <!-- <q-markup-table flat>
            <thead>
              <tr>
                <th colspan="2">
                  <div class="column text-left">
                    <div class="text-h6 text-bold">Cargos</div>
                    <div class="text-secondary text-subtitle2">Listado de cargos creados</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cargo, index) in cargos" :key="index">
                <td>
                  <div class="row items-center text-secondary no-wrap">
                    <q-btn flat icon="delete" size="md" round dense @click="destroy(cargo._id, 3)"/>
                    <div class="text-subtitle1">{{cargo.name}}</div>
                  </div>
                </td>
                <td class="text-right">
                  <div class="text-subtitle1 text-secondary">Cant. Usuarios: {{cargo.cantUser}}</div>
                </td>
              </tr>
            </tbody>
          </q-markup-table> -->
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
      areas: [],
      cargos: [],
      selecD: null,
      selecA: null,
      formDepartment: {},
      formArea: {},
      formCharge: {},
      column: [
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' },
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'cantUser', field: 'cantUser', label: 'Cantidad de Usuarios', align: 'right', text: 'end' }
      ]
    }
  },
  validations: {
    formDepartment: {
      company_id: { required },
      name: { required },
      cantUser: { required }
    },
    formArea: {
      company_id: { required },
      name: { required },
      cantUser: { required }
    },
    formCharge: {
      company_id: { required },
      name: { required },
      cantUser: { required }
    },
    selecD: { required },
    selecA: { required }
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
          // console.log(this.user)
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments').then(res => {
        if (res) {
          this.departamentos = res
          this.getAreas()
        }
      })
    },
    getAreas () {
      this.$api.get('areas').then(res => {
        if (res) {
          if (this.selecD !== null) {
            this.areas = res.filter(v => v.department_id === this.selecD)
          } else {
            this.areas = res
          }
          this.getCargos()
        }
      })
    },
    getCargos () {
      this.$api.get('charges').then(res => {
        if (res) {
          if (this.selecD !== null) {
            this.cargos = []
            for (var i of this.areas) {
              if (res.filter(v => v.area_id === i._id).length) {
                this.cargos = res.filter(v => v.area_id === i._id)
              }
            }
          } else if (this.selecA !== null) {
            this.cargos = res.filter(v => v.area_id === this.selecA)
          } else {
            this.cargos = res
          }
          // this.cargos = res
        }
      })
    },
    selecBtn (id, idx) {
      if (idx === 1) {
        this.selecD = id
        this.selecA = null
        this.getAreas()
      } else if (idx === 2) {
        this.selecA = id
        this.selecD = null
        this.getCargos()
      }
    },
    save (idx) {
      if (idx === 1) {
        this.formDepartment.company_id = this.user.empresa
        this.formDepartment.cantUser = 0
        this.$v.formDepartment.$touch()
        if (!this.$v.formDepartment.$error) {
          this.$api.post('register_department', this.formDepartment).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Departamento creado correctamente',
                color: 'positive'
              })
              this.formDepartment = {}
              this.$v.formDepartment.$reset()
              this.getDepartamentos()
              // this.$router.go(0)
            }
          })
        } else {
          this.$q.notify({
            message: 'Debe ingresar los datos requeridos para el registro de departamentos',
            color: 'negative'
          })
        }
      } else if (idx === 2) {
        this.formArea.company_id = this.user.empresa
        this.formArea.cantUser = 0
        this.$v.formArea.$touch()
        this.$v.selecD.$touch()
        if (!this.$v.formArea.$error && !this.$v.selecD.$error) {
          this.formArea.department_id = this.selecD
          this.$api.post('register_area', this.formArea).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Area creada correctamente',
                color: 'positive'
              })
              this.formArea = {}
              this.selecD = null
              this.$v.formArea.$reset()
              this.$v.selecD.$reset()
              this.getAreas()
              // this.$router.go(0)
            }
          })
        } else {
          this.$q.notify({
            message: 'Debe ingresar los datos requeridos para el registro de areas',
            color: 'negative'
          })
        }
      } else if (idx === 3) {
        this.formCharge.company_id = this.user.empresa
        this.formCharge.cantUser = 0
        this.$v.formCharge.$touch()
        this.$v.selecA.$touch()
        if (!this.$v.formCharge.$error && !this.$v.selecA.$error) {
          this.formCharge.area_id = this.selecA
          this.$api.post('register_charge', this.formCharge).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Cargo creado correctamente',
                color: 'positive'
              })
              this.formCharge = {}
              this.selecD = null
              this.selecA = null
              this.$v.formCharge.$reset()
              this.$v.selecA.$reset()
              this.getCargos()
              // this.$router.go(0)
            }
          })
        } else {
          this.$q.notify({
            message: 'Debe ingresar los datos requeridos para el registro de cargos',
            color: 'negative'
          })
        }
      }
    }/* ,
    destroy (id, idx) {
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas eliminar ${idx === 1 ? 'este departamento' : idx === 2 ? 'esta area' : 'este cargo'}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Eliminando...'
        })
        this.$api.delete(`${idx === 1 ? 'delete_department/' : idx === 2 ? 'delete_area/' : 'delete_charge/'}` + id).then(res => {
          if (res) {
            this.$q.notify({
              message: `${idx === 1 ? 'Departameto eliminado' : idx === 2 ? 'Area eliminada' : 'Cargo eliminado'}`,
              color: 'positive'
            })
            this.getDepartamentos()
          }
          this.$q.loading.hide()
        })
      }).onCancel(() => {
        // cancel
      })
    } */
  }
}
</script>
