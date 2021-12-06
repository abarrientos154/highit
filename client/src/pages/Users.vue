<template>
  <div>
    <Tabla titulo="USUARIOS" subtitulo="Listado de usuarios segun la empresa a la que pertenecen" :columns="column" route="user" :btnNew="true" :eliminarBtn="false" :verBtn="true" :selectBtn="true" :selectFlt="false" />
  </div>
</template>
<script>
import Tabla from '../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      rol: null,
      user: {},
      column: [
        { name: 'Profile', label: 'Perfil', field: 'Profile', filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ]
    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          if (this.rol !== 1) {
            this.column = [
              { name: 'Profile', label: 'Perfil', field: 'Profile', filter_type: 'false', align: 'center' },
              { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
              { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
              { name: 'tipo_usuario', field: 'tipo_usuario', label: 'Tipo de usuario', align: 'left' },
              { name: 'email', field: 'email', label: 'Correo', align: 'center' },
              { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
            ]
          }
        }
      })
    }
  }
}
</script>
