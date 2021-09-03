<template>
  <div>
    <Tabla v-if="info" titulo="Listado de Actividades" :columns="column" route="solicitudes_company" :route_id="user.empresa"/>
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
        { name: 'description', field: 'name', label: 'Actividad', align: 'left' },
        { name: 'consultor_id', field: 'consultor_id', label: 'Consultor', align: 'left' }
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
