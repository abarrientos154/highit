<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer
        v-model="drawer1"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class=""
      >
        <q-scroll-area class="fit">
          <div class="row justify-center q-py-md">
            <q-avatar size="120px">
              <q-img :src="rol !== 1 ? baseu : 'noimg.png'" style="height: 100%;"/>
            </q-avatar>
          </div>
          <div class="text-center text-grey-8 text-subtitle1">¿Qué quieres hacer?</div>

          <q-list class="q-pt-md">
            <div v-for="(item, index) in menu" :key="index">
              <q-item dense clickable v-ripple @click="item.label === 'Cerrar sesión' ? cerrarSesion() : item.ruta !== '' ? $router.push(item.ruta) : ''">
                <q-item-section avatar>
                  <q-icon color="grey-8" :name="item.icon" />
                </q-item-section>
                <q-item-section class="text-grey-8">
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-drawer side="right" v-model="drawer2" show-if-above :width="250" :breakpoint="500" bordered content-class="">
      <q-scroll-area :visible="false" class="fit">
        <div v-if="rol === 4 || rol === 6">
          <div class="q-my-lg">
            <div class="text-center text-h6 text-bold">¿Tienes problemas?</div>
            <div class="text-caption text-center text-grey" style="font-size: 10px;">Crea una nueva solicitud</div>
            <div class="column items-center">
              <q-btn class="text-white q-py-xs" color="primary" label="Nueva solicitud" style="width: 80%; border-radius: 5px;" @click="newRequest()" no-caps/>
            </div>
          </div>
          <!-- <div>
            <div class="q-px-sm">
              <div class="text-h6 text-bold">{{rol === 3 ? 'Resumen mensual' : 'Solicitudes diarias'}}</div>
              <div class="text-caption text-grey" style="font-size: 10px;">{{rol === 3 ? 'Historial de actividades mensuales' : 'Resumen de actividades diarias'}}</div>
            </div>
            <q-scroll-area horizontal style="height: 90px;">
              <div class="row no-wrap full-width">
                <q-card class="q-mx-sm" v-for="(item, index) in resumen" :key="index" style="min-width: 150px;">
                  <div class="q-pa-sm">
                    <div class="text-subtitle1 text-bold">{{'Nombre SLA 01'}}</div>
                    <div class="text-center">
                      <div class="text-bold" style="font-size: 10px;">Actividades realizadas {{'07'}}</div>
                      <div class="text-bold" style="font-size: 10px;">Actividades pendientes {{'17'}}</div>
                    </div>
                  </div>
                </q-card>
              </div>
            </q-scroll-area>
          </div> -->

          <q-dialog v-model="slt">
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
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view ref="modulo"/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import * as moment from 'moment'
import env from '../env'
export default {
  name: 'MainLayout',
  data () {
    return {
      baseu: '',
      rol: 0,
      user: {},
      company: {},
      empresas: [],
      form: {},
      slas: [],
      categorias: [],
      drawer1: true,
      drawer2: true,
      slt: false,
      fchHr: false,
      val: false,
      menu: [],
      menuUser01: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_user01'
        },
        {
          icon: 'person',
          label: 'Crear usuarios',
          ruta: '/usuarios'
        },
        {
          icon: 'location_city',
          label: 'Crear empresa',
          ruta: '/empresas'
        },
        {
          icon: 'list_alt',
          label: 'Contratos',
          ruta: '/contratos'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuUser02: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_user02'
        },
        {
          icon: 'person',
          label: 'Crear usuarios',
          ruta: '/usuarios2'
        },
        {
          icon: 'location_city',
          label: 'Crear empresa',
          ruta: '/empresas'
        },
        {
          icon: 'location_city',
          label: 'Crear Categorias',
          ruta: '/categorias'
        },
        {
          icon: 'location_city',
          label: 'Crear Equipos',
          ruta: '/equipos'
        },
        {
          icon: 'category',
          label: 'Organigrama',
          ruta: '/organigrama'
        },
        {
          icon: 'list_alt',
          label: 'Contratos',
          ruta: '/contratos'
        },
        {
          icon: 'lightbulb',
          label: 'conocimiento',
          ruta: '/vista_conocimiento'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuConsultor: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: ''
        },
        {
          icon: 'lightbulb',
          label: 'conocimiento',
          ruta: '/conocimiento'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuCliente: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_cliente'
        },
        {
          icon: 'stream',
          label: 'Equipos',
          ruta: '/equipos_consultor'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuConsultorAdmin: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_consultor_admin'
        },
        {
          icon: 'stream',
          label: 'Consultores',
          ruta: '/consultores'
        },
        {
          icon: 'stream',
          label: 'Actividades',
          ruta: '/atividades_consultor'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuClienteAdmin: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_cliente_admin'
        },
        {
          icon: 'stream',
          label: 'Equipos',
          ruta: '/equipos_cliente'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuGerente: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_gerente'
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
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
    ...mapMutations('generals', ['logout']),
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
            this.baseu = env.apiUrl + 'perfil_img/' + this.user._id
          }
          if (this.rol === 4 || this.rol === 6) {
            this.getCompany()
          }
          this.menuRol()
        }
      })
    },
    getCompany () {
      this.baseuCompany = env.apiUrl + 'company_img/'
      this.$api.get(`company/${this.user.empresa}`).then(res => {
        if (res) {
          this.company = res
          this.getSlAs()
          this.getCategorias()
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
            this.$refs.modulo.userLogueado()
            this.slt = false
            this.fchHr = false
            this.val = false
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
