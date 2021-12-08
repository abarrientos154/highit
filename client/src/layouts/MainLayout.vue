<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar class="justify-between">
        <q-btn flat round dense @click="drawer1 = !drawer1" icon="menu" color="white"/>
        <q-btn flat round dense color="white" icon="notifications_none" @click="visto = true, $router.push('/notificaciones')">
          <q-badge v-if="notifications.length && !visto" color="red" rounded floating transparent/>
        </q-btn>
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
        <div class="text-center text-caption text-white">{{rol === 1 ? 'Administrador' : rol === 2 ? 'Highit' : rol === 3 ? 'Consultor' : rol === 4 ? 'Cliente final' : rol === 5 ? 'Consultor administrador' : rol === 6 ? 'Cliente administrador' : 'Gerente'}}</div>

        <q-list class="q-pt-md" dark>
          <div class="text-center text-subtitle1 q-mb-xs">Barra de navegación</div>
          <q-expansion-item v-for="(item, index) in menu" :key="index" :expand-icon="!item.items ? 'm' : 'expand_more'" :expanded-icon="!item.items ? 'l' : 'expand_less'" @click="item.items ? '' : item.label === 'Cerrar sesión' ? cerrarSesion() : $router.push(item.ruta)">
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

    <q-page-container class="fondo">
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
      titulo: '',
      subtitulo: '',
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
              ruta: '/usuarios'
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
          ruta: '/conocimientos'
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
          ruta: '/inicio_consultor'
        },
        {
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/solicitudes_consultor'
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
          ruta: '/conocimientos'
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
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/solicitudes'
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
          ruta: '/equipos'
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
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_cliente_admin'
        },
        {
          icon: 'wysiwyg',
          label: 'Solicitudes',
          items: [
            {
              icon: 'view_list',
              label: 'Listado de solicitudes',
              ruta: '/solicitudes'
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
          ruta: '/equipos'
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
          icon: 'list',
          label: 'Indicadores',
          ruta: '/indicadores'
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
      this.$api.get('notifications').then(res => {
        if (res) {
          this.notifications = res.filter(v => v.status === false)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fondo {
  background-image: url('../../public/fondo.jpg');
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
