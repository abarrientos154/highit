<template>
  <div>
    <Tabla v-if="info" titulo="Listado de Actividades" :columns="column" route="solicitudes" :route_id="user.empresa" :verBtn="true" :editarBtn="false" :eliminarBtn="false"/>
  </div>
</template>

<script>
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      user: {},
      info: false,
      column: [
        { name: 'cliente', field: 'cliente', label: 'Autor', align: 'left' },
        { name: 'prioridad', field: 'prioridad', label: 'Prioridad', align: 'left' },
        { name: 'description', field: 'description', label: 'Actividad', align: 'left' },
        { name: 'consultor', field: 'consultor', label: 'Consultor', align: 'left' },
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
          this.info = true
        }
      })
    }
  }
}
</script>
