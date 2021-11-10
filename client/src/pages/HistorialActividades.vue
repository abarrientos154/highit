<template>
  <div>
    <Tabla titulo="Historial de solicitudes" :columns="column" route="solicitudes_history" :verBtn="true" :editarBtn="false" :inputBtn="true" :selectFlt="false" :eliminarBtn="false"/>
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
      column: []
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
          this.column = [
            { name: 'description', field: 'description', label: 'Actividad', align: 'left' },
            { name: 'prioridad', field: 'prioridad', label: 'Prioridad', align: 'left' },
            { name: 'categoria', field: 'categoria', label: 'Categoria', align: 'left' },
            { name: this.rol === 3 ? 'empresa' : 'consultor', field: this.rol === 3 ? 'empresa' : 'consultor', label: this.rol === 3 ? 'Cliente' : 'Consultor', align: 'left' },
            { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
          ]
        }
      })
    }
  }
}
</script>
