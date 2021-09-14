<template>
  <div>
    <Tabla titulo="Listado de Equipos" @formSlt="newRequest($event)" :columns="column" route="equipo_cliente" :eliminarBtn="false" :editarBtn="false" :crearBtn="true" />

    <q-dialog v-model="dialogo">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="column items-end full-width">
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
            <q-select dense filled v-model="form.priority" :options="slas" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.priority.$error" @blur="$v.form.priority.$touch()">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-avatar size="30px" :color="scope.opt.color2"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.nombre"/>
                    <q-item-label class="text-grey-7">{{scope.opt.tiempo}}Hrs</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            <div class="text-caption text-grey-8">Categoria</div>
            <q-select dense filled v-model="form.category" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.category.$error" @blur="$v.form.category.$touch()"/>
          </div>
          <div class="column items-center justify-center q-mb-md">
            <q-checkbox v-model="fchHr" size="xs" label="Personalizar fecha y hora de solicitud"/>
          </div>
          <div v-if="fchHr" class="q-mb-md">
            <q-input dense filled readonly v-model="form.dateSlt" placeholder="aaaa-mm-dd" error-message="Este campo es requerido" :error="$v.form.dateSlt.$error" @blur="$v.form.dateSlt.$touch()" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.dateSlt" mask="YYYY-MM-DD" @input="validarSlt()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input dense filled readonly v-model="form.timeSlt" placeholder="--:--" error-message="Este campo es requerido" :error="$v.form.timeSlt.$error" @blur="$v.form.timeSlt.$touch()" @click="$refs.qTimeProxy.show()">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                    <q-time v-model="form.timeSlt" @input="validarSlt()"/>
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
import * as moment from 'moment'
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
      fchHr: false,
      val: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
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
      dateSlt: { required },
      timeSlt: { required }
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
        }
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.company.company_id}`).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    newRequest (id) {
      this.form = {}
      this.$v.form.$reset()
      this.fchHr = false
      this.val = false
      this.form.equipment = id
      this.dialogo = !this.dialogo
    },
    validarSlt () {
      this.val = moment(moment().format(`${this.form.dateSlt ? 'YYYY-MM-DD' : ''} ${this.form.timeSlt ? 'HH:mm' : ''}`)).isSameOrBefore(`${this.form.dateSlt ? this.form.dateSlt : ''} ${this.form.timeSlt ? this.form.timeSlt : ''}`)
      if (!this.val) {
        this.$q.notify({
          message: 'Debe ingresar fecha y hora valida',
          color: 'negative'
        })
      }
    },
    saveRequest () {
      this.$v.form.$touch()
      if (!this.fchHr) {
        this.form.dateSlt = moment().format('YYYY-MM-DD')
        this.form.timeSlt = moment().format('HH:mm')
        this.validarSlt()
      }
      if (!this.$v.form.$error && this.val) {
        this.form.user_id = this.user._id
        this.form.empresa_id = this.user.empresa
        this.form.company_id = this.user.company
        this.form.expiration = false
        this.form.status = 0
        this.form.date = moment().format('DD/MM/YYYY')
        this.form.time = moment().format('HH:mm')
        this.$api.post('register_solicitud', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Solicitud creada correctamente',
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
            this.fchHr = false
            this.val = false
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
