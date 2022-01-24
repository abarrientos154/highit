<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{ $t('titulo_moduloOrganigrama') }}</div>
      <div class="text-grey text-h6">{{ $t('subtitulo_moduloOrganigrama') }}</div>
    </div>

    <div class="q-py-lg">
      <div class="q-mb-lg">
        <div class="q-mb-md q-px-md">
          <div class="text-bold text-h6">{{$t('text_crearDepartamentos')}}</div>

          <div>
            <div>{{$t('form_nombre')}}</div>
            <q-input outlined filled v-model="formDepartment.name" :error-message="$t('formError_campo')" :error="$v.formDepartment.name.$error" @blur="$v.formDepartment.name.$touch()"/>
          </div>

          <div class="q-mt-sm column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_departamento').toLowerCase()" style="width: 40%; border-radius: 5px;" @click="save(1)" no-caps/>
          </div>
        </div>

        <div>
          <Tabla :subtitulo="$t('subtitulo_listadoDepartamentos')" @actualizarPadre="getDepartamentos()" ref="listaDepartamentos" :columns="column" route="departments" :editarBtn="false"/>
        </div>
      </div>

      <div class="q-mb-lg" v-if="departamentos.length">
        <div class="q-mb-md q-px-md">
          <div class="text-bold text-h6">{{$t('text_crearAreas')}}</div>

          <div>
            <div>{{$t('form_departamento')}}</div>
            <q-select filled v-model="formArea.department_id" use-input behavior="menu" input-debounce="0" :options="departamentos2" map-options option-label="name" emit-value option-value="_id" @filter="filterDepartments" @input="$refs.listaAreas.selectChange(formArea.department_id) && $refs.listaAreas.filterData()" :error-message="$t('formError_campo')" :error="$v.formArea.department_id.$error" @blur="$v.formArea.department_id.$touch()">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('formNotif_noResultados') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div>
            <div>{{$t('form_nombre')}}</div>
            <q-input outlined filled v-model="formArea.name" :error-message="$t('formError_campo')" :error="$v.formArea.name.$error" @blur="$v.formArea.name.$touch()"/>
          </div>

          <div class="q-mt-sm column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_area').toLowerCase()" style="width: 40%; border-radius: 5px;" @click="save(2)" no-caps/>
          </div>
        </div>

        <div>
          <Tabla :subtitulo="$t('subtitulo_listadoAreas')" @actualizarPadre="getAreas()" ref="listaAreas" :columns="column" route="areas" :editarBtn="false" :selectFlt="false"/>
        </div>
      </div>

      <div v-if="areas.length">
        <div class="q-mb-md q-px-md">
          <div class="text-bold text-h6">{{$t('text_crearCargos')}}</div>

          <div>
            <div>{{$t('form_area')}}</div>
            <q-select filled v-model="formCharge.area_id" use-input behavior="menu" input-debounce="0" :options="areas2" map-options option-label="name" emit-value option-value="_id" @filter="filterAreas" @input="$refs.listaCargos.selectChange(formCharge.area_id) && $refs.listaCargos.filterData()" :error-message="$t('formError_campo')" :error="$v.formCharge.area_id.$error" @blur="$v.formCharge.area_id.$touch()">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('formNotif_noResultados') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div>
            <div>{{$t('form_nombre')}}</div>
            <q-input outlined filled v-model="formCharge.name" :error-message="$t('formError_campo')" :error="$v.formCharge.name.$error" @blur="$v.formCharge.name.$touch()"/>
          </div>

          <div class="q-mt-sm column items-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_cargo').toLowerCase()" style="width: 40%; border-radius: 5px;" @click="save(3)" no-caps/>
          </div>
        </div>

        <div>
          <Tabla :subtitulo="$t('subtitulo_listadoCargos')" @actualizarPadre="getCargos()" ref="listaCargos" :columns="column" route="charges" :editarBtn="false" :selectFlt="false"/>
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
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'cantUser', field: 'cantUser', label: this.$t('form_numUsuarios'), filter_type: 'false', align: 'right', text: 'end' }
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
    userLogueado () {
      this.$q.loading.show()
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
    filterDepartments (val, update) {
      if (val === '') {
        update(() => { this.departamentos2 = this.departamentos })
        return
      }
      update(() => { this.departamentos2 = this.departamentos.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    getCargos () {
      this.$api.get('charges').then(res => {
        if (res) {
          this.cargos = res
        }
        this.$q.loading.hide()
      })
    },
    filterAreas (val, update) {
      if (val === '') {
        update(() => { this.areas2 = this.areas })
        return
      }
      update(() => { this.areas2 = this.areas.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
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
                message: this.$t('formNotif_guardado'),
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
            message: !val.length ? this.$t('formError_datos') : this.$t('formError_datosRegistrados'),
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
                message: this.$t('formNotif_guardado'),
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
            message: !val.length ? this.$t('formError_datos') : this.$t('formError_datosRegistrados'),
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
                message: this.$t('formNotif_guardado'),
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
            message: !val.length ? this.$t('formError_datos') : this.$t('formError_datosRegistrados'),
            color: 'negative'
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
