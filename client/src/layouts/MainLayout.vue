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
            <img :src="rol === 2 ? baseu : 'noimg.png'" style="width: 70%; border-radius: 100%" />
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
      <div v-if="rol === 4">
        <div class="q-mb-lg">
          <div class="text-center text-h6 text-bold">¿Tienes problemas?</div>
          <div class="text-caption text-center text-grey" style="font-size: 10px;">Crea una nueva solicitud</div>
          <div class="column items-center">
            <q-btn class="text-white q-py-xs" color="primary" label="Nueva solicitud" style="width: 80%; border-radius: 5px;" @click="slt = !slt" no-caps/>
          </div>
        </div>
        <div class="q-mb-sm">
          <div class="q-px-sm">
            <div class="text-h6 text-bold">Solicitudes diarias</div>
            <div class="text-caption text-grey" style="font-size: 10px;">Resumen de actividades diarias</div>
          </div>
          <q-scroll-area horizontal style="height: 85px;">
            <div class="row no-wrap full-width">
              <q-card class="q-mx-sm" v-for="(item, index) in 3" :key="index" style="min-width: 150px;">
                <div class="q-pa-sm">
                  <div class="text-subtitle1 text-bold">Nombre SLA 01</div>
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
            <q-card>
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
                </div>
              </div>
            </q-card>
          </q-list>
        </div>

        <q-dialog v-model="slt">
          <q-card>
          </q-card>
        </q-dialog>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import env from '../env'
export default {
  name: 'MainLayout',
  data () {
    return {
      baseu: '',
      rol: 0,
      user: {},
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
          if (this.rol === 2) {
            this.baseu = env.apiUrl + 'perfil_img/' + this.user._id
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
    }
  }
}
</script>
