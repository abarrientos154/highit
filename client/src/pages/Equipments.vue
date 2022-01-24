<template>
  <div>
    <Tabla v-if="rol" ref="Tabla" :titulo="$t('titulo_moduloInventario')" @asignarEquipo="asignarEquipo($event)" :subtitulo="$t('subtitulo_moduloInventario')" :columns="column" :route="rol === 2 ? 'equipo' : rol === 4 ? 'equipo_cliente' : 'equipo_consultor'" :btnNew="this.rol === 2 ? true : false" :selectBtn="rol === 2 ? true : false" :selectFlt="rol === 2 ? false : true" :eliminarBtn="rol !== 2 ? false : true" :editarBtn="rol !== 2 ? false : true" :crearBtn="rol === 2 ? false : true" :asignarBtn="rol !== 6 ? false : true"/>

    <q-dialog v-model="dialogo">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div style="width: 80%">
          <div class="q-my-md">
            <div class="text-bold">{{$t('form_cliente')}}</div>
            <q-select dense filled v-model="form.cliente" :options="clientes" map-options option-label="name" emit-value option-value="_id" :error="$v.form.cliente.$error" @blur="$v.form.cliente.$touch()">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-avatar size="35px">
                      <q-img :src="baseu + scope.opt._id" class="full-height"/>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.name"/>
                    <q-item-label class="text-grey-7">{{scope.opt.email}}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" :label="$t('accion_guardar')" style="width: 70%; border-radius: 5px;" @click="asignar()" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Tabla from '../components/TableActions'
import env from '../env'
export default {
  components: { Tabla },
  data () {
    return {
      rol: null,
      baseu: '',
      user: {},
      clientes: [],
      form: {},
      dialogo: false,
      column: [
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'Action', label: 'Acciones', field: this.$t('text_acciones'), filter_type: 'false', sortable: false, align: 'center' }
      ]
    }
  },
  validations: {
    form: {
      cliente: { required }
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
          this.rol = res.roles[0]
          this.user = res
          this.getClientes()
          if (this.rol === 2) {
            this.column = [
              { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
              { name: 'Empresa', field: 'Empresa', label: this.$t('form_empresa'), align: 'left' },
              { name: 'Action', label: this.$t('text_acciones'), field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
            ]
          }
        }
      })
    },
    getClientes () {
      this.$api.get('user_Cliente/' + this.user.empresa).then(res => {
        if (res) {
          this.baseu = env.apiUrl + 'perfil_img/'
          this.clientes = res
        }
        this.$q.loading.hide()
      })
    },
    asignarEquipo (id) {
      this.form = {}
      this.$v.form.$reset()
      this.form.equipment = id
      this.dialogo = !this.dialogo
    },
    asignar () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        this.$api.put('asignar_equipo/' + this.form.equipment, { cliente: this.form.cliente }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
            this.$refs.Tabla.getRecord()
            this.dialogo = false
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
