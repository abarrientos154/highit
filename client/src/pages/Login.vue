<template>
  <div class="column items-center q-pa-md" style="min-height: 100vh">
    <q-img src="leaderboard highit desk 4.png" style="max-width: 750px"/>

    <div class="col row items-center">
      <div class="column items-center">
        <q-avatar class="q-my-md" size="225px">
          <q-img :src="baseu" class="full-height"/>
        </q-avatar>

        <div style="min-width: 300px">
          <div>
            <div class="q-pl-lg q-mb-sm text-caption">{{ $t('form_correo') }}</div>
            <q-input dense autofocus filled type="email" v-model="form.email" :placeholder="$t('formFormat_correo')" @input="getUserEmail()" :error="$v.form.email.$error" :error-message="$t('formError_campo')" @blur="$v.form.email.$touch()" >
              <template v-slot:before>
                <q-icon name="mail_outline" color= "secondary" />
              </template>
            </q-input>
          </div>

          <div class="q-mb-md">
            <div class="q-pl-lg q-mb-sm text-caption">{{ $t('form_contraseña') }}</div>
            <q-input dense filled type="password" v-model="form.password" :placeholder="$t('form_contraseña')" :error="$v.form.password.$error" :error-message="$t('formError_campo')" @blur="$v.form.password.$touch()" >
              <template v-slot:before>
                <q-icon name="vpn_key" color= "secondary" />
              </template>
            </q-input>
          </div>

          <q-btn class="full-width q-py-xs q-mb-md" color="primary" :loading="loading" @click="onSubmit()" no-caps>
            {{ $t('accion_ingresar') }}
            <template v-slot:loading>
              <q-spinner-hourglass class="on-center" />
              {{ $t('accion_cargando') }}
            </template>
          </q-btn>

          <div class="row justify-center">
            <div class="text-grey-7 q-mr-xs">{{ $t('text_recuperarContraseña') }}</div>
            <div class="text-bold text-primary cursor-pointer" @click="recoveryPassword()">{{ $t('accion_recuperarContraseña') }}</div>
          </div>

          <div class="row justify-center">
            <q-select
              v-model="langmodel"
              :options="localeOptions"
              :prefix="$t('form_idioma') + ' ('"
              suffix=")"
              dense
              borderless
              emit-value
              map-options
              options-dense
              style="font-size: 11px"
              @input="changee()"
            />
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="recovery">
      <q-card class="q-pa-md column" style="width: 475px; border-radius: 10px;">
        <q-carousel animated class="col-auto" v-model="slide" transition-prev="slide-right" transition-next="slide-left">
          <q-carousel-slide :name="0" class="q-pa-none">
            <div class="text-center text-h6 text-bold">{{ $t('titulo_recuperarContraseña1') }}</div>
            <div class="text-center text-subtitle1 text-bold">{{ $t('subtitulo_recuperarContraseña1') }}</div>

            <div class="q-mt-lg">
              <div>{{question}}</div>
              <q-input filled :readonly="question === 'Fecha de nacimiento:' ? true : false" v-model="form2.answer" :placeholder="question === 'Fecha de nacimiento:' ? 'DD/MM/AAAA' : $t('form_respuesta')" :error-message="$t('formError_campo')" :error="$v.form2.answer.$error" @blur="$v.form2.answer.$touch()" @click="question === 'Fecha de nacimiento:' ? $refs.qDateProxy.show() : ''">
                <template v-if="question === 'Fecha de nacimiento:'" v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form2.answer" mask="DD/MM/YYYY"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="q-my-sm">
              <div>{{question2}}</div>
              <q-input filled :readonly="question2 === 'Fecha de nacimiento:' ? true : false" v-model="form2.answer2" :placeholder="question2 === 'Fecha de nacimiento:' ? 'DD/MM/AAAA' : $t('form_respuesta')" :error-message="$t('formError_campo')" :error="$v.form2.answer2.$error" @blur="$v.form2.answer2.$touch()" @click="question2 === 'Fecha de nacimiento:' ? $refs.qDateProxy.show() : ''">
                <template v-if="question2 === 'Fecha de nacimiento:'" v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form2.answer2" mask="DD/MM/YYYY"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="1" class="q-pa-none">
            <div class="text-center text-h6 text-bold">{{ $t('titulo_recuperarContraseña2') }}</div>
            <div class="text-center text-subtitle1 text-bold">{{ $t('subtitulo_recuperarContraseña2') }}</div>

            <div class="q-mt-sm text-subtitle1">{{ $t('form_contraseña') }}</div>
            <q-input :type="isPwd ? 'password' : 'text'" v-model="newPassword" filled :error-message="$t('formError_validacionContraseña')" :error="$v.newPassword.$error" @blur="$v.newPassword.$touch()">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <div class="q-mt-sm text-subtitle1">{{ $t('form_confirContraseña') }}</div>
            <q-input :type="isPwd ? 'password' : 'text'" v-model="repeatNewPassword" filled :error-message="$t('formError_validacionContraseña')" :error="$v.repeatNewPassword.$error" @blur="$v.repeatNewPassword.$touch()"/>
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <q-btn dense class="text-white q-py-xs" color="primary" :label="slide === 0 ? $t('accion_siguiente') : $t('accion_guardar')" @click="slide === 0 ? siguiente() : changePassword()" style="width: 70%; border-radius: 5px;" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../env'
import { mapMutations, mapState } from 'vuex'
import { required, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      langmodel: 'es',
      localeOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'pt', label: 'Português' }
      ],
      slide: 0,
      baseu: 'Desk.jpg',
      loading: false,
      email: '',
      form: {},
      form2: {},
      user: {},
      userEmail: {},
      rol: null,
      empresaEnable: false,
      isPwd: true,
      recovery: false,
      security: {},
      question: '',
      question2: '',
      newPassword: '',
      repeatNewPassword: ''
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    },
    form2: {
      answer: { required },
      answer2: { required }
    },
    newPassword: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatNewPassword: { sameAsPassword: sameAs('newPassword') }
  },
  mounted () {
    this.langmodel = this.lang
    // this.$i18n.locale = this.lang
  },
  /* watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  }, */
  computed: {
    ...mapState('generals', ['lang'])
  },
  methods: {
    changee () {
      this.$i18n.locale = this.langmodel
      this.changeLang(this.langmodel)
      location.reload()
    },
    ...mapMutations('generals', ['login', 'changeLang']),
    getUserEmail () {
      if (this.form.email && !this.$v.form.email.$error) {
        this.$api.get('user_email/' + this.form.email).then(res => {
          if (res.length) {
            this.userEmail = res[0]
            this.rol = this.userEmail.roles[0]
            if (this.rol !== 1) {
              this.empresaEnable = this.userEmail.empresa_user.enable
              this.baseu = env.apiUrl + 'company_img/' + this.userEmail.empresa
            } else {
              this.baseu = 'Desk.jpg'
            }
          } else {
            this.rol = null
            this.empresaEnable = false
            this.baseu = 'Desk.jpg'
          }
        })
      }
    },
    onSubmit () {
      this.$v.form.$touch()
      if (this.rol && this.rol !== 1 ? !this.$v.form.$error && this.empresaEnable : !this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: this.$t('accion_cargando')
        })
        this.$api.post('login', this.form).then(res => {
          if (res) {
            this.user = res.HIGHIT_SESSION_INFO
            res.lang = this.lang
            this.login(res)
            if (this.user.roles[0] === 1) {
              this.$router.push('/inicio_user01')
            } else if (this.user.roles[0] === 2) {
              this.$router.push('/inicio_user02')
            } else if (this.user.roles[0] === 3) {
              this.$router.push('/inicio_consultor')
            } else if (this.user.roles[0] === 4) {
              this.$router.push('/inicio_cliente')
            } else if (this.user.roles[0] === 5) {
              this.$router.push('/inicio_consultor_admin')
            } else if (this.user.roles[0] === 6) {
              this.$router.push('/inicio_cliente_admin')
            } else if (this.user.roles[0] === 7) {
              this.$router.push('/inicio_gerente')
            }
          }
          this.$q.loading.hide()
          this.loading = false
        })
      } else {
        this.$q.notify({
          message: !this.empresaEnable ? this.$t('formError_empresaDeshabilitada') : this.$t('formError_datos'),
          color: 'negative'
        })
      }
    },
    recoveryPassword () {
      this.$v.form.email.$touch()
      if (!this.$v.form.email.$error && this.userEmail.security) {
        this.security = this.userEmail.security
        this.$api.get('question_security/' + this.security.question_id).then(res => { if (res) { this.question = res.name } })
        this.$api.get('question_security/' + this.security.question2_id).then(res => { if (res) { this.question2 = res.name } })
        this.slide = 0
        this.form2 = {}
        this.newPassword = ''
        this.repeatNewPassword = ''
        this.$v.form2.$reset()
        this.$v.newPassword.$reset()
        this.$v.repeatNewPassword.$reset()
        this.recovery = true
      } else {
        this.$q.notify({
          message: this.$v.form.email.$error ? this.$t('formError_cuentaRecuperarContraseña') : this.$t('formError_configSeguridad'),
          color: 'negative'
        })
      }
    },
    siguiente () {
      this.$v.form2.$touch()
      if (!this.$v.form2.$error && this.security.answer === this.form2.answer && this.security.answer2 === this.form2.answer2) {
        this.slide = 1
      } else {
        this.$q.notify({
          message: this.$t('formError_respuestas'),
          color: 'negative'
        })
      }
    },
    async changePassword () {
      this.$v.newPassword.$touch()
      this.$v.repeatNewPassword.$touch()
      if (!this.$v.newPassword.$error && !this.$v.repeatNewPassword.$error) {
        this.$q.loading.show()
        const send = {
          answer: this.form2.answer,
          answer2: this.form2.answer2,
          newPassword: this.newPassword
        }
        await this.$api.put('password_edit/' + this.userEmail._id, send).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
            this.recovery = false
          }
        })
      }
    }
  }
}
</script>
