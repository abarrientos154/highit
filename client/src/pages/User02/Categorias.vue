<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{ $t('titulo_moduloCategorias') }}</div>
      <div class="text-grey text-h6">{{ $t('subtitulo_moduloCategorias') }}</div>
    </div>

    <div>
      <div class="q-pa-md">
        <div class="text-h5 text-bold">{{ $t('text_crearCategorias') }}</div>
        <div class="q-mt-md text-subtitle1">{{ $t('form_departamento') }}</div>
        <q-select filled v-model="form.departamento" use-input behavior="menu" input-debounce="0" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="areasOpt(form.departamento)" @filter="filterDepartments" :error-message="$t('formError_campo')" :error="$v.form.departamento.$error" @blur="$v.form.departamento.$touch()">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('formNotif_noResultados') }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-mt-sm text-subtitle1">{{ $t('form_area') }}</div>
        <q-select filled v-model="form.area" use-input behavior="menu" input-debounce="0" :options="areas" map-options option-label="name" emit-value option-value="_id" @input="cargosOpt(form.area)" @filter="filterAreas" :error-message="$t('formError_campo')" :error="$v.form.area.$error" @blur="$v.form.area.$touch()">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('formNotif_noResultados') }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-mt-sm text-subtitle1">{{ $t('form_cargo') }}</div>
        <q-select filled v-model="form.cargo" use-input behavior="menu" input-debounce="0" :options="cargos" map-options option-label="name" emit-value option-value="_id" @filter="filterCharges" :error-message="$t('formError_campo')" :error="$v.form.cargo.$error" @blur="$v.form.cargo.$touch()">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('formNotif_noResultados') }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-mt-md text-subtitle1">{{ $t('form_nombre') }}</div>
        <q-input filled v-model="form.nombre" :error-message="$t('formError_campo')" :error="$v.form.nombre.$error" @blur="$v.form.nombre.$touch()"/>

        <div class="row justify-center">
          <q-btn no-caps class="q-py-xs" color="primary" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_categoria').toLowerCase()" @click="guardar_categoria()" style="width:40%" />
        </div>
      </div>

      <Tabla :subtitulo="$t('subtitulo_listadoCategorias')" ref="latabla3" :editarBtn="false" :columns="column" route="categorias" :btnNew="false" />
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
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', filter_type: 'false', sortable: false, align: 'center' },
        { name: 'nombre', field: this.$t('form_nombre'), label: 'Nombre', align: 'left' },
        { name: 'departamentoName', field: 'departamentoName', label: this.$t('form_departamento'), align: 'left' }
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
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getDepartamentos()
          this.obtener_categorias()
        }
        this.$q.loading.hide()
      })
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
          this.departamentos2 = [...this.departamentos]
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
    areasOpt (id) {
      this.$api.get('areas/' + id).then(res => {
        if (res) {
          this.areas = res
          this.areas2 = [...this.areas]
        }
      })
    },
    filterAreas (val, update) {
      if (val === '') {
        update(() => { this.areas = this.areas2 })
        return
      }
      update(() => { this.areas = this.areas2.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    cargosOpt (id) {
      this.$api.get('cargos/' + id).then(res => {
        if (res) {
          this.cargos = res
          this.cargos2 = [...this.cargos]
        }
      })
    },
    filterCharges (val, update) {
      if (val === '') {
        update(() => { this.cargos = this.cargos2 })
        return
      }
      update(() => { this.cargos = this.cargos2.filter(v => v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) })
    },
    obtener_categorias () {
      this.$api.get('categorias/' + this.user.empresa).then(res => {
        if (res) {
          this.lista = res
        }
      })
    },
    guardar_categoria () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        this.form.company_id = this.user.empresa
        this.$api.post('categoria', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
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
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_datos'),
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
