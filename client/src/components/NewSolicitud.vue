<template>
  <div class="full-width">
    <div class="column items-center">
      <q-btn class="text-white full-width q-py-xs" color="primary" :label="$t('accion_nuevaSlt')" style="border-radius: 5px;" @click="newRequest()" no-caps/>
    </div>
    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="column items-end full-width">
          <div class="bg-red q-mr-xl" style="width: 60px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">{{$t('accion_nuevaSlt')}}</div>
          <div class="text-center text-grey-8">{{$t('subtitulo_crearSltCliente')}}</div>
        </div>
        <div style="width: 80%">
          <div>
            <div class="text-caption text-grey-8">{{$t('text_descripcionSlt')}}</div>
            <q-input dense v-model="form.description" filled type="textarea" :placeholder="$t('form_numCaracteres')" :error-message="$t('formError_campo')" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
          </div>
          <div>
            <div class="text-caption text-grey-8">{{$t('text_selecPrioridad')}}</div>
            <q-select dense filled v-model="form.priority" :options="slas" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.priority.$error" @blur="$v.form.priority.$touch()">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-avatar size="30px" :color="scope.opt.color2"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.nombre"/>
                    <q-item-label class="text-grey-7">{{scope.opt.tiempo}}Min</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            <div class="text-caption text-grey-8">{{$t('form_categoria')}}</div>
            <q-select dense filled v-model="form.category" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.category.$error" @blur="$v.form.category.$touch()"/>
          </div>
          <div class="column items-center justify-center q-mb-md">
            <q-checkbox v-model="fchHr" size="xs" :label="$t('form_agendarAtencion')"/>
          </div>
          <div v-if="fchHr" class="q-mb-md">
            <q-input dense filled readonly v-model="form.dateSlt" :placeholder="$t('formFormat_fecha')" :error-message="$t('formError_campo')" :error="$v.form.dateSlt.$error" @blur="$v.form.dateSlt.$touch()" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.dateSlt" mask="YYYY-MM-DD" @input="validarSlt()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input dense filled readonly v-model="form.timeSlt" placeholder="--:--" :error-message="$t('formError_campo')" :error="$v.form.timeSlt.$error" @blur="$v.form.timeSlt.$touch()" @click="$refs.qTimeProxy.show()">
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
          <q-btn class="text-white q-py-xs" color="primary" :label="$t('accion_crearSlt')" style="width: 70%; border-radius: 5px;" @click="saveRequest()" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import * as moment from 'moment'
export default {
  props: {
    equipment: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      user: {},
      empresa: {},
      slas: [],
      categorias: [],
      slt: false,
      fchHr: false,
      val: false,
      form: {}
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
          this.user = res
          this.getCompany()
        }
      })
    },
    getCompany () {
      this.$api.get(`company/${this.user.empresa}`).then(res => {
        if (res) {
          this.empresa = res
          this.getSlAs()
          this.getCategorias()
        }
      })
    },
    getSlAs () {
      this.$api.get(`sla_by_contrato/${this.empresa.typeContract}`).then(res => {
        if (res) {
          this.slas = res
        }
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.empresa.company_id}`).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    newRequest () {
      this.form = {}
      this.$v.form.$reset()
      this.fchHr = false
      this.val = false
      this.slt = !this.slt
    },
    validarSlt () {
      this.val = moment(moment().format(`${this.form.dateSlt ? 'YYYY-MM-DD' : ''} ${this.form.timeSlt ? 'HH:mm' : ''}`)).isSameOrBefore(`${this.form.dateSlt ? this.form.dateSlt : ''} ${this.form.timeSlt ? this.form.timeSlt : ''}`)
      if (!this.val) {
        this.$q.notify({
          message: this.$t('formNotif_fechaHoraValida'),
          color: 'negative'
        })
      }
    },
    saveRequest () {
      this.$v.form.$touch()
      if (!this.fchHr) {
        this.form.dateSlt = moment().format('YYYY-MM-DD')
        this.form.timeSlt = moment().format('HH:mm')
        this.form.scheduled = false
        this.validarSlt()
      } else { this.form.scheduled = true }
      if (!this.$v.form.$error && this.val) {
        this.form.user_id = this.user._id
        this.form.empresa_id = this.user.empresa
        this.form.company_id = this.user.company
        if (this.equipment) {
          this.form.equipment = this.equipment
        }
        this.form.expirationDate = moment(this.form.dateSlt + ' ' + this.form.timeSlt).add(this.slas.find(v => v._id === this.form.priority).tiempo, 'minutes').format('YYYY-MM-DD HH:mm')
        this.form.expiration = false
        this.form.status = 0
        this.form.date = moment().format('YYYY-MM-DD')
        this.form.time = moment().format('HH:mm')
        this.$api.post('register_solicitud', this.form).then(res => {
          if (res) {
            this.$api.post('register_notification', {
              user_id: this.form.category,
              emit_id: this.user._id,
              status: false,
              solicitud_id: res._id,
              icon: 'note_add',
              name: this.$t('accion_nuevaSlt'),
              description: this.$t('textNotif_nuevaSlt1') + this.user.name + ' ' + this.user.last_name + this.$t('textNotif_nuevaSlt2') + res.description
            })
            this.$q.notify({
              message: this.$t('formNotif_creadaSlt'),
              color: 'positive'
            })
            this.slt = false
            this.fchHr = false
            this.val = false
            this.$emit('actualizarPadre')
          }
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_allDatosCorrectos'),
          color: 'negative'
        })
      }
    }
  }
}
</script>
