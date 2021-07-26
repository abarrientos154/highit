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
        <div v-if="rol === 4">
          <div class="q-my-lg">
            <div class="text-center text-h6 text-bold">¿Tienes problemas?</div>
            <div class="text-caption text-center text-grey" style="font-size: 10px;">Crea una nueva solicitud</div>
            <div class="column items-center">
              <q-btn class="text-white q-py-xs" color="primary" label="Nueva solicitud" style="width: 80%; border-radius: 5px;" @click="slt = !slt" no-caps/>
            </div>
          </div>
          <div>
            <div class="q-px-sm">
              <div class="text-h6 text-bold">Solicitudes diarias</div>
              <div class="text-caption text-grey" style="font-size: 10px;">Resumen de actividades diarias</div>
            </div>
            <q-scroll-area horizontal style="height: 90px;">
              <div class="row no-wrap full-width">
                <q-card class="q-mx-sm" v-for="(item, index) in 3" :key="index" style="min-width: 150px;">
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
          </div>

          <div>
            <div class="q-px-sm">
              <div class="text-h6 text-bold">Solicitudes activas</div>
              <div class="text-caption text-grey" style="font-size: 10px;">listado de actividades sin terminar</div>
            </div>
            <q-list class="q-px-sm">
              <q-card class="q-mb-md" v-for="(item, index) in 2" :key="index">
                <div class="row justify-between">
                  <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{'001'}}</div>
                  <div class="bg-red q-mr-md" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                </div>
                <div class="column items-center" style="margin-top: -10px">
                  <q-avatar class="bg-secondary" size="75px">
                    <q-img :src="''" class="full-height"/>
                  </q-avatar>
                  <div class="text-center text-subtitle1 text-bold">{{'Nombre Empresa'}}</div>
                </div>
                <div class="q-pa-md">
                  <div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Estado</div>
                        <div style="font-size: 10px;">{{'En espera'}}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                        <div style="font-size: 10px;">{{'Usuario'}}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                        <div style="font-size: 10px;">{{'Contrato 01'}}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Departamento</div>
                        <div style="font-size: 10px;">{{'Departamento 01'}}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                      <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                      <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                      <div style="font-size: 10px;">{{'10min'}}</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </q-list>
          </div>

          <q-dialog v-model="slt">
            <q-card class="column items-center no-wrap" style="width: 500px; border-radius: 10px;">
              <div class="column items-end full-width">
                <div class="bg-red q-mr-xl" style="width: 60px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
              </div>
              <div class="q-mb-xl q-mt-md" style="width: 80%">
                <div class="q-mb-lg">
                  <div class="text-center text-h6 text-bold">Nueva solicitud</div>
                  <div class="text-center text-grey-8">Crea una nueva solicitud para tu cliente</div>
                </div>
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
                  <q-input dense filled readonly v-model="form.date" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.date.$error" @blur="$v.form.date.$touch()" @click="$refs.qDateProxy.show()">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.date" mask="DD/MM/YYYY"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="column items-center">
                  <q-btn class="text-white q-py-xs" color="primary" label="Crear solicitud" style="width: 80%; border-radius: 5px;" @click="saveRequest()" no-caps/>
                </div>
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
import env from '../env'
export default {
  name: 'MainLayout',
  data () {
    return {
      baseu: '',
      rol: 0,
      user: {},
      form: {},
      slas: [],
      categorias: [],
      drawer1: true,
      drawer2: true,
      slt: false,
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
          icon: 'category',
          label: 'Organigrama',
          ruta: ''
        },
        {
          icon: 'list_alt',
          label: 'Contratos',
          ruta: '/contratos'
        },
        {
          icon: 'ballot',
          label: 'Historial',
          ruta: ''
        },
        {
          icon: 'forum',
          label: 'Salas de chat',
          ruta: ''
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
      date: { required }
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
          console.log(this.user)
          if (this.rol !== 1) {
            this.baseu = env.apiUrl + 'perfil_img/' + this.user._id
          }
          if (this.rol === 4) {
            this.getSlAs()
            this.getCategorias()
          }
          this.menuRol()
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
      }
    },
    getSlAs () {
      this.$api.get('sla').then(res => {
        if (res) {
          this.slas = res
          // console.log(this.slas, 'slas')
        }
      })
    },
    getCategorias () {
      this.$api.get('categorias').then(res => {
        if (res) {
          this.categorias = res
          // console.log(this.categorias, 'categorias')
        }
      })
    },
    saveRequest () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
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
            this.slt = false
            this.$v.form.$reset()
            this.$refs.modulo.userLogueado()
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
