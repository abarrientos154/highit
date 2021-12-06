<template>
  <div>
    <Tabla v-if="info" titulo="LISTADO DE ACTIVIDADES" subtitulo="Historial de actividades por consultor asignado" :columns="column" route="solicitudes" :route_id="user.empresa" :verBtn="true" :editarBtn="false" :selectBtn="true" :selectFlt="false" :eliminarBtn="false"/>
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
        { name: 'description', field: 'description', label: 'Actividad', align: 'left' },
        { name: 'prioridad', field: 'prioridad', label: 'Prioridad', align: 'left' },
        { name: 'categoria', field: 'categoria', label: 'Categoria', align: 'left' },
        { name: 'empresa', field: 'empresa', label: 'Cliente', align: 'left' },
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
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.info = true
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>
