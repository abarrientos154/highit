<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer v-model="drawer1" show-if-above :width="200" :breakpoint="500" bordered content-class="">
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
      menu: [],
      menuUser01: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_user01'
        },
        {
          icon: 'person',
          label: 'Usuarios',
          ruta: '/usuarios'
        },
        {
          icon: 'location_city',
          label: 'Empresas',
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
          label: 'Usuarios',
          ruta: '/usuarios2'
        },
        {
          icon: 'location_city',
          label: 'Empresas',
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
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_consultor'
        },
        {
          icon: 'assignment',
          label: 'Historial de solicitudes',
          ruta: '/historial_solicitudes'
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
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_cliente'
        },
        {
          icon: 'assignment',
          label: 'Historial de solicitudes',
          ruta: '/historial_solicitudes'
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
          icon: 'assignment',
          label: 'Historial de solicitudes',
          ruta: '/historial_solicitudes'
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
    }
  }
}
</script>
