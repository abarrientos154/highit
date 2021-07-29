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
        <div v-if="rol === 3 || rol === 4">
          <div v-if="rol === 4" class="q-my-lg">
            <div class="text-center text-h6 text-bold">¿Tienes problemas?</div>
            <div class="text-caption text-center text-grey" style="font-size: 10px;">Crea una nueva solicitud</div>
            <div class="column items-center">
              <q-btn class="text-white q-py-xs" color="primary" label="Nueva solicitud" style="width: 80%; border-radius: 5px;" @click="newRequest()" no-caps/>
            </div>
          </div>
          <div>
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
          </div>

          <div>
            <div class="q-px-sm">
              <div class="text-h6 text-bold">{{rol === 3 ? 'Sin tomar' : 'Solicitudes activas'}}</div>
              <div class="text-caption text-grey" style="font-size: 10px;">{{rol === 3 ? 'Actividades que aun no son resueltas' : 'listado de actividades sin terminar'}}</div>
            </div>
            <q-list class="q-px-sm">
              <q-card class="q-mb-md" v-for="(item, index) in solicitudes" :key="index" @click="verStl(item, index)">
                <div class="row justify-between">
                  <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{index + 1}}</div>
                  <div :class="`bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md`" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                </div>
                <div class="column items-center" style="margin-top: -10px">
                  <q-avatar class="bg-secondary" size="75px">
                    <q-img :src="baseuCompany + item.company_id" class="full-height"/>
                  </q-avatar>
                  <div class="text-center text-subtitle1 text-bold">{{rol === 3 ? empresas.filter(v => v._id === item.company_id)[0].name : company.name}}</div>
                </div>
                <div class="q-pa-md">
                  <div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Estado</div>
                        <div style="font-size: 10px;">{{item.status === 0 ? 'Sin iniciar' : item.status === 1 ? 'Ejecucion' : item.status === 2 ? 'En espera' : item.status === 3 ? 'Finalizada' : '' }}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                        <div style="font-size: 10px;">{{'Usuario'}}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                        <div style="font-size: 10px;">{{contratos.filter(v => rol === 3 ? v._id === empresas.filter(v => v._id === item.company_id)[0].typeContract : v._id === company.typeContract)[0].contrato}}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Departamento</div>
                        <div style="font-size: 10px;">{{departamentos.filter(v => v._id === categorias.filter(v => v._id === item.category)[0].departamento)[0].name}}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                      <div style="font-size: 10px;">{{item.date}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                      <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                      <div style="font-size: 10px;">{{slas.filter(v => v._id === item.priority)[0].tiempo}}hrs</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </q-list>
          </div>

          <div v-if="rol === 3">
            <div class="q-px-sm">
              <div class="text-h6 text-bold">Trabajo activo</div>
              <div class="text-caption text-grey" style="font-size: 10px;">Listado de actividades sin terminar</div>
            </div>
            <q-list class="q-px-sm">
              <q-card class="q-mb-md" v-for="(item, index) in sltConsultor" :key="index" @click="verStl(item, index)">
                <div class="row justify-between">
                  <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{index + 1}}</div>
                  <div :class="`bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md`" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                </div>
                <div class="column items-center" style="margin-top: -10px">
                  <q-avatar class="bg-secondary" size="75px">
                    <q-img :src="baseuCompany + item.company_id" class="full-height"/>
                  </q-avatar>
                  <div class="text-center text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.company_id)[0].name}}</div>
                </div>
                <div class="q-pa-md">
                  <div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Estado</div>
                        <div style="font-size: 10px;">{{item.status === 0 ? 'Sin iniciar' : item.status === 1 ? 'Ejecucion' : item.status === 2 ? 'En espera' : item.status === 3 ? 'Finalizada' : '' }}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                        <div style="font-size: 10px;">{{'Usuario'}}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                        <div style="font-size: 10px;">{{contratos.filter(v => v._id === empresas.filter(v => v._id === item.company_id)[0].typeContract)[0].contrato}}</div>
                      </div>
                      <div class="col">
                        <div class="text-bold" style="font-size: 10px;">Departamento</div>
                        <div style="font-size: 10px;">{{departamentos.filter(v => v._id === categorias.filter(v => v._id === item.category)[0].departamento)[0].name}}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                      <div style="font-size: 10px;">{{item.date}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                      <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                    </div>
                    <div class="row">
                      <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                      <div style="font-size: 10px;">{{slas.filter(v => v._id === item.priority)[0].tiempo}}hrs</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </q-list>
          </div>

          <q-dialog v-model="slt">
            <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
              <div class="column items-end full-width" v-if="rol === 4">
                <div class="bg-red q-mr-xl" style="width: 60px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
              </div>
              <div v-else class="row q-px-lg items-center justify-between full-width">
                <div class="row">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{form.num}}</div>
                </div>
                <div :class="`text-caption q-px-lg text-center text-white bg-${form.priorityColor} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{form.priority}}<br>{{form.status === 0 ? 'Sin iniciar' : form.status === 1 ? 'Ejecucion' : form.status === 2 ? 'En espera' : form.status === 3 ? 'Finalizada' : '' }}</div>
              </div>
              <div class="q-mb-lg q-mt-md">
                <div class="text-center text-h6 text-bold">{{rol === 3 ? 'Tomar solicitud' : 'Nueva solicitud'}}</div>
                <div class="text-center text-grey-8">{{rol === 3 ? 'Modifica el estado de la solicitud' : 'Crea una nueva solicitud para tu cliente'}}</div>
              </div>
              <div style="width: 80%" v-if="rol === 4 && !form.status">
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
                  <q-input dense filled readonly v-model="form.date2" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.date2.$error" @blur="$v.form.date2.$touch()" @click="$refs.qDateProxy.show()">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.date2" mask="DD/MM/YYYY"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="q-px-sm q-mb-md full-width" v-else>
                <div class="row">
                  <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
                    <q-img :src="baseuCompany + form.company_id" class="full-height"/>
                  </q-avatar>
                  <div class="q-px-sm q-py-md col column justify-between">
                    <div>
                      <div class="text-subtitle1 text-bold">{{form.empresa}}</div>
                      <div>
                        <div class="text-bold text-caption text-grey-7">Descripcion del servicio</div>
                        <q-scroll-area style="height: 60px;">
                          <div class="text-grey-7" style="font-size: 10px;">{{form.description}}</div>
                        </q-scroll-area>
                      </div>
                    </div>
                    <div>
                      <div class="row">
                        <div class="text-bold q-mr-xs text-grey-7 text-caption">Fecha de solicitud:</div>
                        <div class="text-grey-7 text-caption">{{form.date2}}</div>
                      </div>
                      <div class="row">
                        <div class="text-bold q-mr-xs text-grey-7 text-caption">Hora de solicitud:</div>
                        <div class="text-grey-7 text-caption">{{form.tiempo}}hrs</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="q-px-sm q-mb-md">
                  <div class="row">
                    <div class="col">
                      <div class="text-bold text-grey-7">Tipo de contrato</div>
                      <div class="text-grey-7">{{form.contrato}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold text-grey-7">Usuario asignado</div>
                      <div class="text-grey-7">{{'Usuario'}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="text-bold text-grey-7">Categoria</div>
                      <div class="text-grey-7">{{form.category}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold text-grey-7">Departamento</div>
                      <div class="text-grey-7">{{form.department}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="text-bold text-grey-7">Fecha de inicio</div>
                      <div class="text-grey-7">{{form.date}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold text-grey-7">Hora de inicio</div>
                      <div class="text-grey-7">{{form.time}}</div>
                    </div>
                  </div>
                  <!-- <div class="row">
                    <div class="col">
                      <div class="text-bold text-grey-7">Fecha estimada de termino</div>
                      <div class="text-grey-7">{{'Contrato 01'}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold text-grey-7">Hora estimada de termino</div>
                      <div class="text-grey-7">{{'Departamento 01'}}</div>
                    </div>
                  </div> -->
                </div>
                <div class="q-px-sm q-mb-md" v-if="rol === 3 && form.status > 0 && form.status < 3">
                  <div v-if="form.status < 2">
                    <div class="text-caption text-grey-8">Cambia el estado de Solicitud</div>
                    <q-select dense filled v-model="form2.status" :options="estados" map-options option-label="name" emit-value option-value="status" :error="$v.form2.status.$error" @blur="$v.form2.status.$touch()"/>
                  </div>
                  <div>
                    <div class="text-caption text-grey-8">Nombre de hito</div>
                    <q-input dense v-model="form2.name" filled placeholder="Nombre del hito" error-message="Este campo es requerido" :error="$v.form2.name.$error" @blur="$v.form2.name.$touch()"/>
                  </div>
                  <div>
                    <div class="text-caption text-grey-8">Descripción del trabajo realizado</div>
                    <q-input dense v-model="form2.description" filled type="textarea" placeholder="Hasta 500 caracteres" error-message="Este campo es requerido" :error="$v.form2.description.$error" @blur="$v.form2.description.$touch()"/>
                  </div>
                </div>
              </div>
              <div class="full-width column items-center q-mb-lg">
                <q-btn class="text-white q-py-xs" color="primary" :label="rol === 3 && form.status === 0 ? 'Tomar solicitud' : rol === 3 && form.status > 0 && form.status < 3 ? 'Cambiar estado' : rol === 4 && newslt ? 'Crear solicitud' : 'Cerrar'" style="width: 70%; border-radius: 5px;" @click="rol === 3 && form.status === 0 ? statusRequest(1) : rol === 3 && form.status > 0 && form.status < 3 ? saveHito() : rol === 4 && newslt ? saveRequest() : slt = !slt" no-caps/>
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
      baseuCompany: '',
      rol: 0,
      user: {},
      company: {},
      empresas: [],
      form: {},
      form2: {},
      estados: [{ name: 'En espera', status: 2 }, { name: 'Finalizado', status: 3 }],
      slas: [],
      categorias: [],
      departamentos: [],
      contratos: [],
      hitos: [],
      resumen: [],
      solicitudes: [],
      sltConsultor: [],
      drawer1: true,
      drawer2: true,
      slt: false,
      newslt: false,
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
          icon: 'stream',
          label: 'Equipos',
          ruta: '/equipos_consultor'
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
      date2: { required }
    },
    form2: {
      status: { required },
      name: { required },
      description: { required }
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
          // console.log(this.user)
          if (this.rol !== 1) {
            this.baseu = env.apiUrl + 'perfil_img/' + this.user._id
            if (this.rol !== 2) {
              this.getCompany()
            }
          }
          this.menuRol()
        }
      })
    },
    getCompany () {
      this.baseuCompany = env.apiUrl + 'company_img/'
      this.$api.get(this.rol === 3 ? `companys_by_company/${this.user.company}` : this.rol === 4 ? `company/${this.user.empresa}` : '').then(res => {
        if (res) {
          if (this.rol === 3) {
            this.empresas = res
          } else if (this.rol === 4) {
            this.company = res
          }
          this.getSlAs()
          this.getCategorias()
          this.getContratos()
          this.getHitos()
          this.getDepartamentos()
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
    getCategorias () {
      this.$api.get(`categorias/${this.rol === 3 ? this.user.company : this.rol === 4 ? this.company.company_id : ''}`).then(res => {
        if (res) {
          this.categorias = res
          // console.log(this.categorias, 'categorias')
        }
      })
    },
    getSlAs () {
      this.$api.get(this.rol === 3 ? `sla_by_company/${this.user.company}` : this.rol === 4 ? `sla_by_contrato/${this.company.typeContract}` : '').then(res => {
        if (res) {
          this.slas = res
          this.getSlt()
          // console.log(this.slas, 'slas')
        }
      })
    },
    getDepartamentos () {
      this.$api.get(`departments/${this.rol === 3 ? this.user.company : this.rol === 4 ? this.company.company_id : ''}`).then(res => {
        if (res) {
          this.departamentos = res
          // console.log(this.departamentos, 'depas')
        }
      })
    },
    getContratos () {
      this.$api.get(`contratos_by_company/${this.rol === 3 ? this.user.company : this.rol === 4 ? this.company.company_id : ''}`).then(res => {
        if (res) {
          this.contratos = res
          // console.log(this.contratos, 'contratos')
        }
      })
    },
    getHitos () {
      this.$api.get(`hitos_by_company/${this.rol === 3 ? this.user.company : this.rol === 4 ? this.company.company_id : ''}`).then(res => {
        if (res) {
          this.hitos = res
          console.log(this.hitos, 'hitos')
        }
      })
    },
    newRequest () {
      this.form = {}
      this.$v.form.$reset()
      this.newslt = true
      this.slt = !this.slt
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
    },
    getSlt () {
      if (this.rol === 3) {
        this.$api.post('solicitudes_by_consultor', { status: 0 }).then(res => {
          if (res) {
            this.solicitudes = res
            this.$api.put('solicitudes_consultor/' + this.user._id, { status: 1 }).then(res => {
              if (res) {
                this.sltConsultor = res
              }
            })
          }
        })
      } else if (this.rol === 4) {
        this.$api.put('solicitudes_cliente/' + this.user._id, { status: 1 }).then(res => {
          if (res) {
            this.solicitudes = res
            // console.log(this.solicitudes, 'solicitudes')
          }
        })
      }
    },
    verStl (itm, idx) {
      this.newslt = false
      this.slt = !this.slt
      this.form = { ...itm }
      this.form.empresa = this.rol === 3 ? this.empresas.filter(v => v._id === itm.company_id)[0].name : this.company.name
      this.form.priority = this.slas.filter(v => v._id === itm.priority)[0].nombre
      this.form.priorityColor = this.slas.filter(v => v._id === itm.priority)[0].color2
      this.form.tiempo = this.slas.filter(v => v._id === itm.priority)[0].tiempo
      this.form.category = this.categorias.filter(v => v._id === itm.category)[0].nombre
      this.form.department = this.departamentos.filter(v => v._id === this.categorias.filter(v => v._id === itm.category)[0].departamento)[0].name
      this.form.contrato = this.contratos.filter(v => this.rol === 3 ? v._id === this.empresas.filter(v => v._id === itm.company_id)[0].typeContract : v._id === this.company.typeContract)[0].contrato
      this.form.num = idx + 1
    },
    saveHito () {
      this.$v.form2.$touch()
      if (this.form.status === 2) {
        this.form2.status = 3
      }
      if (!this.$v.form2.$error) {
        const hoy = new Date()
        this.form2.date = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear()
        this.form2.company_id = this.user.company
        this.form2.solicitud_id = this.form._id
        this.$api.post('register_hito', this.form2).then(res => {
          if (res) {
            this.statusRequest(this.form2.status)
            this.form2 = {}
            this.$v.form2.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    statusRequest (idx) {
      this.$api.put('status_solicitud/' + this.form._id, { status: idx, consultor_id: this.user._id }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Estado de la solicitud modificado',
            color: 'positive'
          })
          this.form = {}
          this.slt = false
          this.$refs.modulo.userLogueado()
          this.getSlt()
        }
      })
    }
  }
}
</script>
