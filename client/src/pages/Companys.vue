<template>
  <div>
    <div>
      <Tabla v-if="listado" titulo="Listado de empresas" :columns="column" route="companys" :route_id="rol === 2 ? user.empresa : null" :habilitarBtn="true" :eliminarBtn="false" :btnNew="true" :verBtn="true"/>
    </div>
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
      empresas: [],
      listado: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'phone', field: 'phone', label: 'Telefono', align: 'left' },
        { name: 'contrato', field: 'contrato', label: 'Contrato', align: 'left' },
        { name: 'Profile', label: 'Perfil', field: 'Profile', filter_type: 'false', align: 'center' },
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
          this.user = res
          this.rol = res.roles[0]
          this.listado = true
        }
      })
    }
  }
}
</script>
