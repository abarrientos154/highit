<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{ $t('titulo_moduloContratos') }}</div>
      <div class="text-grey text-h6">{{ $t('subtitulo_moduloContratos') }}</div>
    </div>

    <div>
      <div class="q-pa-md">
        <div class="text-h5 text-bold">{{ $t('text_crearContratos') }}</div>
        <div>
          <div class="text-subtitle1">{{ $t('form_nombre') }}</div>
          <q-input filled v-model="form.contrato" :error-message="$t('formError_campo')" :error="$v.form.contrato.$error" @blur="$v.form.contrato.$touch()"/>
        </div>

        <div v-if="rol === 1">
          <div class="q-mt-sm text-subtitle1">{{ $t('form_tipoMoneda') }}</div>
          <q-select filled v-model="form.moneda" :options="['CLP', 'USD', 'EUR', 'MXN', 'BRL', 'COP']" :error-message="$t('formError_campo')" :error="$v.form.moneda.$error" @blur="$v.form.moneda.$touch()"/>

          <div class="q-mt-sm text-subtitle1">{{ $t('form_costoUsuarios') }}</div>
          <q-field filled :suffix="form.moneda" :error-message="$t('formError_campo')" :error="$v.form.costo.$error" @blur="$v.form.costo.$touch()">
            <template v-slot:control>
              <money class="q-field__input text-right" v-model="form.costo"/>
            </template>
          </q-field>
        </div>

        <div class="q-mt-md row justify-center">
          <q-btn no-caps class="q-py-xs" color="primary" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_contrato').toLowerCase()" @click="guardar_contrato()" style="width:40%" />
        </div>
      </div>

      <Tabla v-if="listado" :subtitulo="$t('subtitulo_listadoContratos')" @actualizarPadre="obtener_contratos()" ref="latabla" :columns="column" route="contratos" :route_id="rol === 2 ? user.empresa : null" :btnNew="false" />
    </div>

    <div v-if="rol === 2">
      <div class="q-pa-md">
        <div class="q-mt-md text-h5 text-bold">{{ $t('text_añadirPrioridad') }}</div>

        <div class="text-subtitle1">{{ $t('form_contrato') }}</div>
        <q-select filled v-model="form2.contrato" use-input behavior="menu" input-debounce="0" :options="lista" map-options option-label="contrato" emit-value option-value="_id" @filter="filterFn" :error-message="$t('formError_campo')" :error="$v.form2.contrato.$error" @blur="$v.form2.contrato.$touch()">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-mt-md text-subtitle1">{{ $t('form_nombre') }}</div>
        <q-input filled v-model="form2.nombre" :error-message="$t('formError_campo')" :error="$v.form2.nombre.$error" @blur="$v.form2.nombre.$touch()"/>

        <div class="row">
          <div class="col q-pr-md">
            <div class="q-mt-md text-subtitle1">{{ $t('form_tiempo') }}</div>
            <q-input type="number" filled v-model.number="form2.tiempo" :error-message="$t('formError_campo')" :error="$v.form2.tiempo.$error" @blur="$v.form2.tiempo.$touch()">
              <template v-slot:after class="text-subtitle2">
                <div class="text-subtitle2">{{ $t('text_minutos') }}</div>
              </template>
            </q-input>
          </div>

          <div class="col q-pl-md">
            <div class="q-mt-md text-subtitle1">{{ $t('form_color') }}</div>
            <q-select filled v-model="color" :options="options" :error-message="$t('formError_campo')" :error="$v.color.$error" @blur="$v.color.$touch()"/>
          </div>
        </div>

        <div class="row justify-center q-mt-md">
          <q-btn no-caps class="q-py-xs" color="primary" text-color="white" :label="$t('accion_crear') + ' ' + $t('form_prioridad').toLowerCase()" @click="guardar_SLA()" style="width:40%" />
        </div>
      </div>

      <Tabla :subtitulo="$t('subtitulo_listadoPrioridades')" ref="latabla2" :columns="column2" route="sla" :editarBtn="false" :selectBtn="true" :btnNew="false" :selectFlt="false"/>
    </div>
  </div>
</template>
<script>
import { required, requiredIf, minValue } from 'vuelidate/lib/validators'
import Tabla from '../components/TableActions'
import { Money } from 'v-money'
export default {
  components: { Tabla, Money },
  data () {
    return {
      filterBy: null,
      rol: null,
      listado: false,
      user: {},
      form: {},
      form2: {},
      column: [
        { name: 'contrato', field: 'contrato', label: this.$t('form_nombre'), align: 'left' },
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
      ],
      column2: [
        { name: 'nombre', field: 'nombre', label: this.$t('form_nombre'), align: 'center' },
        { name: 'tiempo', field: 'tiempo', label: this.$t('form_tiempo'), align: 'right', filter_type: 'false', text: 'end' },
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ],
      lista: [],
      lista2: [],
      color: '',
      options: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Rosado', 'Gris', 'Negro', 'Celeste', 'Anaranjado', 'Morado', 'Cafe'],
      empresas: []
    }
  },
  validations: {
    form: {
      contrato: { required },
      moneda: {
        required: requiredIf(function () {
          return this.rol === 1
        })
      },
      costo: {
        required: requiredIf(function () {
          return this.rol === 1
        }),
        minValue: minValue(0.01)
      }
    },
    form2: {
      contrato: { required },
      nombre: { required },
      tiempo: { required, minValue: minValue(1) }
    },
    color: { required }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.listado = true
          if (this.rol === 1) {
            this.column = [
              { name: 'contrato', field: 'contrato', label: this.$t('form_nombre'), align: 'left' },
              { name: 'costo', field: 'costo', label: this.$t('form_costoUsuarios'), align: 'right', text: 'end' },
              { name: 'Action', label: this.$t('text_acciones'), field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
            ]
          }
          this.obtener_contratos()
        }
      })
    },
    obtener_contratos () {
      this.$api.get(this.rol === 1 ? 'contratos' : 'contratos_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.lista = res
          this.lista2 = [...this.lista]
          this.$refs.latabla.getRecord()
          if (this.rol !== 1) { this.$refs.latabla2.getOptions() }
        }
        this.$q.loading.hide()
      })
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
    guardar_contrato () {
      this.$v.form.$touch()
      const val = this.lista.filter(v => v.contrato === this.form.contrato)
      if (!this.$v.form.$error && !val.length) {
        this.$q.loading.show()
        this.form.status = this.rol
        if (this.rol === 2) {
          this.form.company_id = this.user.empresa
        }
        this.$api.post('contrato', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
            this.$refs.latabla.getRecord()
            if (this.rol !== 1) { this.$refs.latabla2.getOptions() }
            this.obtener_contratos()
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: val.length ? this.$t('formError_datosRegistrados') : this.$t('formError_datos'),
          color: 'negative'
        })
      }
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
              message: this.$t('formNotif_guardado'),
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
