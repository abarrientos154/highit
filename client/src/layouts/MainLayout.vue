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

    <q-drawer
        side="right"
        v-model="drawer2"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class=""
      >
        <q-scroll-area class="fit">
        </q-scroll-area>
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
          icon: 'location_city',
          label: 'Crear empresa',
          ruta: '/empresas'
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
      }
    }
  }
}
</script>
