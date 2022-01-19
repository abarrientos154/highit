<template>
  <div>
    <Tabla v-if="rol" :titulo="$t('titulo_moduloUsuarios')" :subtitulo="$t('subtitulo_moduloUsuarios')" :columns="column" route="user" :btnNew="true" :eliminarBtn="false" :verBtn="true" :selectBtn="true" :selectFlt="false" />
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
        { name: 'Profile', label: this.$t('form_ prefil'), field: 'Profile', filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'last_name', field: 'last_name', label: this.$t('form_apellido'), align: 'left' },
        { name: 'email', field: 'email', label: this.$t('form_correo'), align: 'left' },
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
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
          this.rol = res.roles[0]
          this.user = res
          if (this.rol !== 1) {
            this.column = [
              { name: 'Profile', label: this.$t('form_ prefil'), field: 'Profile', filter_type: 'false', align: 'center' },
              { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
              { name: 'last_name', field: 'last_name', label: this.$t('form_apellido'), align: 'left' },
              { name: 'tipo_usuario', field: 'tipo_usuario', label: this.$t('form_tipoUsuario'), align: 'left' },
              { name: 'email', field: 'email', label: this.$t('form_correo'), align: 'left' },
              { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
            ]
          }
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>
