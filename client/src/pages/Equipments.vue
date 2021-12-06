<template>
  <div>
    <Tabla v-if="rol" titulo="PRODUCTOS" @asignarEquipo="asignarEquipo($event)" :subtitulo="rol === 2 ? 'Listado de equipos para tus clientes' : rol === 4 ? 'Listado de equipos asignado' : 'Listado de equipos pertenecientes a tu empresa'" :columns="column" :route="rol === 2 ? 'equipo' : rol === 4 ? 'equipo_cliente' : 'equipo_consultor'" :btnNew="this.rol === 2 ? true : false" :selectBtn="rol === 2 ? true : false" :selectFlt="rol === 2 ? false : true" :eliminarBtn="rol !== 2 ? false : true" :editarBtn="rol !== 2 ? false : true" :crearBtn="rol === 2 ? false : true" :asignarBtn="rol !== 6 ? false : true"/>

    <q-dialog v-model="dialogo">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div style="width: 80%">
          <div class="q-my-md">
            <div class="text-bold">Selecciona un cliente</div>
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
          <q-btn class="text-white q-py-xs" color="primary" :label="'Asignar'" style="width: 70%; border-radius: 5px;" @click="asignar()" no-caps/>
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
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
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
              message: 'Asignacion realizada correctamente',
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
            this.dialogo = false
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    }
  }
}
</script>
