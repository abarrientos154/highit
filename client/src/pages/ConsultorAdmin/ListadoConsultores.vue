<template>
  <div>
    <Tabla v-if="info" titulo="CONSULTORES" subtitulo="Listado de usuarios consultores" :columns="column" route="user_consultor" :route_id="user.empresa" :selectBtn="true" :selectFlt="false"/>
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
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'department', field: 'department', label: 'Departamento', align: 'left' }
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
