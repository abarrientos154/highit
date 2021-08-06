<template>
  <div>
    <Tabla titulo="Listado de Equipos" @mostrar="newRequest($event)" :columns="column" route="equipo_consultor" :eliminarBtn="false" :editarBtn="false" :crearBtn="true" />

    <q-dialog v-model="dialogo">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="column items-end full-width" v-if="rol === 4">
          <div class="bg-red q-mr-xl" style="width: 60px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">{{'Nueva solicitud'}}</div>
          <div class="text-center text-grey-8">{{'Crea una nueva solicitud para tu cliente'}}</div>
        </div>
        <div style="width: 80%">
          <div>
            <div class="text-caption text-grey-8">Descripción de la solicitud</div>
            <q-input dense v-model="form.description" filled type="textarea" placeholder="Hasta 500 caracteres" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
          </div>
          <div>
            <div class="text-caption text-grey-8">Selecciona prioridad</div>
            <q-select dense filled v-model="form.priority" :options="slas" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.priority.$error" @blur="$v.form.priority.$touch()"/>
          </div>
          <div>
            <div class="text-caption text-grey-8">Categoria</div>
            <q-select dense filled v-model="form.category" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.category.$error" @blur="$v.form.category.$touch()"/>
          </div>
          <div>
            <div class="text-caption text-grey-8">Agenda la atencion</div>
            <q-input dense filled readonly v-model="form.dateSlt" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.dateSlt.$error" @blur="$v.form.dateSlt.$touch()" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.dateSlt" mask="DD/MM/YYYY"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" :label="'Crear solicitud'" style="width: 70%; border-radius: 5px;" @click="saveRequest()" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      rol: 0,
      user: {},
      company: {},
      slas: [],
      categorias: [],
      form: {},
      lista: {},
      model: '',
      date: '',
      text: '',
      dialogo: false,
      showModalEliminar: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' }
      ],
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  validations: {
    form: {
      description: { required },
      priority: { required },
      category: { required },
      dateSlt: { required }
    }
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
          this.getCompany()
          // console.log(this.user)
        }
      })
    },
    getCompany () {
      this.$api.get(`company/${this.user.empresa}`).then(res => {
        if (res) {
          this.company = res
          this.getSlAs()
          this.getCategorias()
        }
      })
    },
    getSlAs () {
      this.$api.get(`sla_by_contrato/${this.company.typeContract}`).then(res => {
        if (res) {
          this.slas = res
          // console.log(this.slas, 'slas')
        }
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.company.company_id}`).then(res => {
        if (res) {
          this.categorias = res
          // console.log(this.categorias, 'categorias')
        }
      })
    },
    newRequest (id) {
      this.dialogo = !this.dialogo
      this.form.equipment = id
    },
    saveRequest () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        const hoy = new Date()
        this.form.date = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear()
        this.form.time = hoy.getHours() + ':' + hoy.getMinutes()
        this.form.user_id = this.user._id
        this.form.company_id = this.user.empresa
        this.form.status = 0
        this.$api.post('register_solicitud', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Solicitud creada correctamente',
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
