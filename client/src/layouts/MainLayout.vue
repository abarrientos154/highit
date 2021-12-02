<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawer1" show-if-above :width="225" :breakpoint="500" bordered content-class="">
      <q-scroll-area class="fit">
        <q-btn flat round dense class="absolute-top-right q-ma-sm" color="grey-8" icon="notifications_none" @click="visto = true, $router.push('/notificaciones')">
          <q-badge v-if="notifications.length && !visto" color="red" rounded floating transparent/>
        </q-btn>
        <div class="row justify-center q-py-md">
          <q-avatar size="120px" class="shadow-5">
            <q-img :src="rol !== 1 ? baseu : 'Desk.jpg'" style="height: 100%;"/>
          </q-avatar>
        </div>
        <div v-if="rol !== 1" class="text-center text-bold text-h6">{{user.name}} {{user.last_name}}</div>
        <div class="text-center text-grey-8 text-subtitle1">{{rol === 1 ? 'Administrador' : rol === 2 ? 'Highit' : rol === 3 ? 'Consultor' : rol === 4 ? 'Cliente final' : rol === 5 ? 'Consultor administrador' : rol === 6 ? 'Cliente administrador' : 'Gerente'}}</div>

        <q-list class="q-pt-md">
          <div class="text-center text-grey-8 text-caption q-mb-xs">¿Qué quieres hacer?</div>
          <q-expansion-item borderless v-for="(item, index) in menu" :key="index" :expand-icon="!item.items ? 'm' : 'expand_more'" :expanded-icon="!item.items ? 'l' : 'expand_less'" @click="item.items ? '' : item.label === 'Cerrar sesión' ? cerrarSesion() : $router.push(item.ruta)">
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
    </q-drawer>

    <q-page-container>
      <router-view/>
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
      visto: false,
      notifications: [],
      menu: [],
      menuUser01: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_user01'
        },
        {
          icon: 'settings',
          label: 'Configuración',
          items: [
            {
              icon: 'assignment_turned_in',
              label: 'Contratos',
              ruta: '/contratos'
            },
            {
              icon: 'business',
              label: 'Empresas',
              ruta: '/empresas'
            },
            {
              icon: 'person',
              label: 'Usuarios',
              ruta: '/usuarios'
            }
          ]
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
          icon: 'settings',
          label: 'Configuración',
          items: [
            {
              icon: 'assignment_turned_in',
              label: 'Contratos',
              ruta: '/contratos'
            },
            {
              icon: 'schema',
              label: 'Organigrama',
              ruta: '/organigrama'
            },
            {
              icon: 'category',
              label: 'Categorias',
              ruta: '/categorias'
            },
            {
              icon: 'business',
              label: 'Empresas',
              ruta: '/empresas'
            },
            {
              icon: 'person',
              label: 'Usuarios',
              ruta: '/usuarios2'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: 'Inventario',
          ruta: '/equipos'
        },
        {
          icon: 'lightbulb',
          label: 'Bases de conocimiento',
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
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/inicio_consultor'
            },
            {
              icon: 'assignment',
              label: 'Historial de solicitudes',
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'lightbulb',
          label: 'Bases de conocimiento',
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
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/inicio_cliente'
            },
            {
              icon: 'assignment',
              label: 'Historial de solicitudes',
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: 'Inventario',
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
          icon: 'support_agent',
          label: 'Consultores',
          items: [
            {
              icon: 'assignment_ind',
              label: 'Listado de consultores',
              ruta: '/consultores'
            },
            {
              icon: 'manage_accounts',
              label: 'Actividades por consultor',
              ruta: '/atividades_consultor'
            }
          ]
        },
        {
          icon: 'logout',
          label: 'Cerrar sesión',
          ruta: ''
        }
      ],
      menuClienteAdmin: [
        {
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/inicio_cliente_admin'
            },
            {
              icon: 'assignment',
              label: 'Historial de solicitudes',
              ruta: '/historial_solicitudes'
            }
          ]
        },
        {
          icon: 'devices_other',
          label: 'Inventario',
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
          icon: 'list',
          label: 'Indicadores',
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
      this.$api.get('notifications_sin_ver').then(res => {
        if (res) {
          this.notifications = res
        }
      })
    }
  }
}
</script>
