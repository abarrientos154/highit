<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar class="justify-between">
        <q-btn flat round dense @click="drawer1 = !drawer1" icon="menu" color="white"/>
        <div class="row items-center q-gutter-sm">
          <q-select
            v-model="langmodel"
            :options="localeOptions"
            :prefix="$t('form_idioma') + ' ('"
            suffix=")"
            rounded
            dark
            dense
            standout
            emit-value
            map-options
            options-dense
            @input="changee()"
          />
          <q-btn flat round dense color="white" icon="notifications_none" @click="visto = true, $router.push('/notificaciones')">
            <q-badge v-if="notifications.length && !visto" color="red" rounded floating transparent/>
          </q-btn>
          <q-btn flat round dense v-if="rol === 1" color="white" icon="lock" @click="security = true, editPassword = true"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer1" bordered show-if-above :width="225" :breakpoint="500" content-class="bg-primary">
      <q-scroll-area class="fit">
        <div class="row justify-center q-py-md">
          <q-avatar size="120px" class="shadow-5">
            <q-img :src="rol !== 1 ? baseu : 'Desk.jpg'" style="height: 100%;"/>
          </q-avatar>
        </div>
        <div v-if="rol !== 1" class="text-center text-bold text-h6 text-white">{{user.name}} {{user.last_name}}</div>
        <div class="text-center text-caption text-white">{{rol === 1 ? $t('rol1'): rol === 2 ? $t('rol2') : rol === 3 ? $t('rol3') : rol === 4 ? $t('rol4') : rol === 5 ? $t('rol5') : rol === 6 ? $t('rol6') : $t('rol7')}}</div>

        <q-list class="q-pt-md q-pb-lg" dark>
          <div class="text-bold text-center text-subtitle1 q-mb-xs">{{ $t('text_navegacion') }}</div>
          <q-expansion-item v-for="(item, index) in menu" :key="index" :expand-icon="!item.items ? 'm' : 'expand_more'" :expanded-icon="!item.items ? 'l' : 'expand_less'" @click="item.items ? '' : item.icon === 'logout' ? cerrarSesion() : $router.push(item.ruta)">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon :name="item.icon"/>
              </q-item-section>
              <q-item-section style="margin-left: -25px">
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </template>

            <q-item clickable dense v-ripple v-for="(item2, index) in item.items" :key="index" @click="$router.push(item2.ruta)">
              <q-item-section avatar class="q-ml-md">
                <q-icon :name="item2.icon" size="20px"/>
              </q-item-section>
              <q-item-section style="margin-left: -25px">
                <q-item-label class="text-caption">{{ item2.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <div class="bg-primary absolute-bottom q-py-xs text-center text-caption text-white">HIGHIT DESK <b>v0.1</b></div>
    </q-drawer>

    <q-page-container class="fondo">
      <router-view/>
    </q-page-container>

    <q-dialog v-model="security" @hide="editPassword = false" :persistent="!editPassword">
      <q-card class="q-pa-md" style="width: 475px; border-radius: 10px;">
        <div v-if="editPassword">
          <div class="q-mt-sm text-h6 text-center">{{$t('text_nuevaContraseña')}}</div>

          <div class="q-mt-sm text-subtitle1">{{$t('form_contraseñaActual')}}</div>
          <q-input :type="isPwd2 ? 'password' : 'text'" v-model="oldpassword" filled :error-message="$t('formError_campo')" :error="$v.oldpassword.$error" @blur="$v.oldpassword.$touch()">
            <template v-slot:append>
              <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>

          <div class="q-mt-sm text-subtitle1">{{$t('form_contraseña')}}</div>
          <q-input :type="isPwd ? 'password' : 'text'" v-model="password" filled :error-message="$t('formError_validacionContraseña')" :error="$v.password.$error" @blur="$v.password.$touch()">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="q-mt-sm text-subtitle1">{{$t('form_confirContraseña')}}</div>
          <q-input filled :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" :error-message="$t('formError_validacionContraseña')" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"/>

          <div class="row justify-center">
            <q-btn color="primary" class="q-py-xs" text-color="white" :label="$t('accion_guardar') + ' ' + $t('form_contraseña').toLowerCase()" @click="editar_contrasena()" style="width:40%" no-caps/>
          </div>
        </div>

        <div v-else>
          <div class="text-center text-h6 text-bold">{{ $t('titulo_configSeguridad') }}</div>
          <div class="text-center text-subtitle1 text-bold">{{ $t('subtitulo_configSeguridad') }}</div>

          <div class="q-mt-lg">
            <div>{{ $t('form_preguntaSeguridad') }}</div>
            <q-select filled v-model="form.question_id" :options="options.filter(v => v._id !== form.question2_id)" map-options :option-label="langmodel === 'es' ? 'name_es' : langmodel === 'en-us' ? 'name_en' : 'name_pt'" emit-value option-value="_id" :error-message="$t('formError_campo')" :error="$v.form.question_id.$error" @blur="$v.form.question_id.$touch()"/>
            <q-input v-if="form.question_id" filled :readonly="questions.find(v => v._id === form.question_id).name_es === 'Fecha de nacimiento:' ? true : false" v-model="form.answer" :placeholder="questions.find(v => v._id === form.question_id).name_es === 'Fecha de nacimiento:' ? 'DD/MM/AAAA' : $t('form_respuesta')" :error-message="$t('formError_campo')" :error="$v.form.answer.$error" @blur="$v.form.answer.$touch()" @click="questions.find(v => v._id === form.question_id).name_es === 'Fecha de nacimiento:' ? $refs.qDateProxy.show() : ''">
              <template v-if="questions.find(v => v._id === form.question_id).name_es === 'Fecha de nacimiento:'" v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.answer" mask="DD/MM/YYYY"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="q-my-sm">
            <div>{{ $t('form_preguntaSeguridad') }}</div>
            <q-select filled v-model="form.question2_id" :options="options.filter(v => v._id !== form.question_id)" map-options :option-label="langmodel === 'es' ? 'name_es' : langmodel === 'en-us' ? 'name_en' : 'name_pt'" emit-value option-value="_id" :error-message="$t('formError_campo')" :error="$v.form.question2_id.$error" @blur="$v.form.question2_id.$touch()"/>
            <q-input v-if="form.question2_id" filled :readonly="questions.find(v => v._id === form.question2_id).name_es === 'Fecha de nacimiento:' ? true : false" v-model="form.answer2" :placeholder="questions.find(v => v._id === form.question2_id).name_es === 'Fecha de nacimiento:' ? 'DD/MM/AAAA' : $t('form_respuesta')" :error-message="$t('formError_campo')" :error="$v.form.answer2.$error" @blur="$v.form.answer2.$touch()" @click="questions.find(v => v._id === form.question2_id).name_es === 'Fecha de nacimiento:' ? $refs.qDateProxy.show() : ''">
              <template v-if="questions.find(v => v._id === form.question2_id).name_es === 'Fecha de nacimiento:'" v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.answer2" mask="DD/MM/YYYY"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row justify-center">
            <q-btn class="text-white q-py-xs" color="primary" :label="$t('accion_guardar')" @click="configurar()" style="width: 70%; border-radius: 5px;" no-caps/>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { required, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapMutations, mapState } from 'vuex'
import env from '../env'
export default {
  name: 'MainLayout',
  data () {
    return {
      langmodel: '',
      localeOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'pt', label: 'Português' }
      ],
      baseu: '',
      rol: 0,
      user: {},
      drawer1: true,
      security: false,
      editPassword: false,
      oldpassword: '',
      password: '',
      repeatPassword: '',
      isPwd: true,
      isPwd2: true,
      visto: false,
      titulo: '',
      subtitulo: '',
      notifications: [],
      form: {},
      options: [],
      questions: [],
      menu: [],
      menuUser01: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_user01'
        },
        {
          icon: 'settings',
          label: this.$t('ruta_config'),
          items: [
            {
              icon: 'assignment_turned_in',
              label: this.$t('ruta_contratos'),
              ruta: '/contratos'
            },
            {
              icon: 'business',
              label: this.$t('ruta_empresas'),
              ruta: '/empresas'
            },
            {
              icon: 'person',
              label: this.$t('ruta_usuarios'),
              ruta: '/usuarios'
            }
          ]
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuUser02: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_user02'
        },
        {
          icon: 'settings',
          label: this.$t('ruta_config'),
          items: [
            {
              icon: 'assignment_turned_in',
              label: this.$t('ruta_contratos'),
              ruta: '/contratos'
            },
            {
              icon: 'schema',
              label: this.$t('ruta_organigrama'),
              ruta: '/organigrama'
            },
            {
              icon: 'category',
              label: this.$t('ruta_categorias'),
              ruta: '/categorias'
            },
            {
              icon: 'business',
              label: this.$t('ruta_empresas'),
              ruta: '/empresas'
            },
            {
              icon: 'person',
              label: this.$t('ruta_usuarios'),
              ruta: '/usuarios'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: this.$t('ruta_inventario'),
          ruta: '/equipos'
        },
        {
          icon: 'lightbulb',
          label: this.$t('ruta_conocimientos'),
          ruta: '/conocimientos'
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuConsultor: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_consultor'
        },
        {
          icon: 'wysiwyg',
          label: this.$t('ruta_solicitudes'),
          items: [
            {
              icon: 'view_list',
              label: this.$t('ruta_solicitudes'),
              ruta: '/solicitudes_consultor'
            },
            {
              icon: 'assignment',
              label: this.$t('ruta_historialSlt'),
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'lightbulb',
          label: this.$t('ruta_conocimientos'),
          ruta: '/conocimientos'
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuCliente: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_cliente'
        },
        {
          icon: 'wysiwyg',
          label: this.$t('ruta_solicitudes'),
          items: [
            {
              icon: 'view_list',
              label: this.$t('ruta_solicitudes'),
              ruta: '/solicitudes'
            },
            {
              icon: 'assignment',
              label: this.$t('ruta_historialSlt'),
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: this.$t('ruta_inventario'),
          ruta: '/equipos'
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuConsultorAdmin: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_consultor_admin'
        },
        {
          icon: 'support_agent',
          label: this.$t('ruta_consultores'),
          items: [
            {
              icon: 'assignment_ind',
              label: this.$t('ruta_consultores'),
              ruta: '/consultores'
            },
            {
              icon: 'manage_accounts',
              label: this.$t('ruta_consultoresSlt'),
              ruta: '/atividades_consultor'
            }
          ]
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuClienteAdmin: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_cliente_admin'
        },
        {
          icon: 'wysiwyg',
          label: this.$t('ruta_solicitudes'),
          items: [
            {
              icon: 'view_list',
              label: this.$t('ruta_solicitudes'),
              ruta: '/solicitudes'
            },
            {
              icon: 'assignment',
              label: this.$t('ruta_historialSlt'),
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: this.$t('ruta_inventario'),
          ruta: '/equipos'
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ],
      menuGerente: [
        {
          icon: 'home',
          label: this.$t('ruta_inicio'),
          ruta: '/inicio_gerente'
        },
        {
          icon: 'list',
          label: this.$t('ruta_indicadores'),
          ruta: '/indicadores'
        },
        {
          icon: 'logout',
          label: this.$t('ruta_salir'),
          ruta: ''
        }
      ]
    }
  },
  validations: {
    form: {
      question_id: { required },
      answer: { required },
      question2_id: { required },
      answer2: { required }
    },
    oldpassword: { required },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.langmodel = this.lang
    this.userLogueado()
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
    ...mapMutations('generals', ['logout', 'changeLang']),
    cerrarSesion () {
      this.logout()
      this.$router.push('/login')
    },
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          if (this.rol !== 1) {
            if (!this.user.security) {
              this.getQuestions()
              this.security = true
            }
            this.baseu = env.apiUrl + 'perfil_img/' + this.user._id
          }
          this.menuRol()
          this.getNotifications()
        }
      })
    },
    menuRol () {
      if (this.rol === 1) {
        this.menu = this.menuUser01
      } else if (this.rol === 2) {
        this.menu = this.menuUser02
      } else if (this.rol === 3) {
        this.menu = this.menuConsultor
      } else if (this.rol === 4) {
        this.menu = this.menuCliente
      } else if (this.rol === 5) {
        this.menu = this.menuConsultorAdmin
      } else if (this.rol === 6) {
        this.menu = this.menuClienteAdmin
      } else if (this.rol === 7) {
        this.menu = this.menuGerente
      }
    },
    getNotifications () {
      this.$api.get('notifications').then(res => {
        if (res) {
          this.notifications = res.filter(v => v.status === false)
        }
      })
    },
    getQuestions () {
      this.$api.get('question_security').then(res => {
        if (res) {
          this.questions = res
          this.options = [...this.questions]
          this.security = true
        }
      })
    },
    async configurar () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        this.user.security = this.form
        await this.$api.put('datos_edit/' + this.user._id, this.user).then(res => {
          if (res) {
            if (res.code) {
              this.$q.notify({
                message: this.$t('formError_datosRegistrados'),
                color: 'negative'
              })
            } else {
              this.$q.notify({
                message: this.$t('formNotif_guardado'),
                color: 'positive'
              })
              this.security = false
            }
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_datos'),
          color: 'negative'
        })
      }
    },
    async editar_contrasena () {
      this.$v.oldpassword.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (!this.$v.oldpassword.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.$q.loading.show({
          message: this.$t('accion_cargando')
        })
        const send = {
          password: this.oldpassword,
          newPassword: this.password
        }
        await this.$api.put('password_edit/' + this.user._id, send).then(res => {
          if (res) {
            if (res.code) {
              this.$q.notify({
                message: this.$t('formError_datosU'),
                color: 'negative'
              })
            } else {
              this.$q.notify({
                message: this.$t('formNotif_guardado'),
                color: 'positive'
              })
              this.security = false
              this.oldpassword = ''
              this.password = ''
              this.repeatPassword = ''
              this.$v.oldpassword.$reset()
              this.$v.password.$reset()
              this.$v.repeatPassword.$reset()
            }
          }
          this.$q.loading.hide()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fondo {
  background-image: url('../../public/fondo.jpg');
  background-attachment: fixed;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
