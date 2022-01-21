<template>
  <div>
    <Tabla v-if="rol" :titulo="$t('titulo_moduloEmpresas')" :subtitulo="$t('subtitulo_moduloEmpresa')" :columns="column" route="companys" :route_id="rol === 2 ? user.empresa : null" :habilitarBtn="true" :eliminarBtn="false" :btnNew="true" :verBtn="true"/>
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
      column: [
        { name: 'Profile', label: this.$t('form_perfil'), field: 'Profile', filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'email', field: 'email', label: this.$t('form_correo'), align: 'left' },
        { name: 'phone', field: 'phone', label: this.$t('form_telefono'), align: 'left' },
        { name: 'contrato', field: 'contrato', label: this.$t('form_contrato'), align: 'left' },
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
          this.user = res
          this.rol = res.roles[0]
          if (this.rol === 1) {
            this.column = [
              { name: 'Profile', label: this.$t('form_perfil'), field: 'Profile', filter_type: 'false', align: 'center' },
              { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
              { name: 'email', field: 'email', label: this.$t('form_correo'), align: 'left' },
              { name: 'phone', field: 'phone', label: this.$t('form_telefono'), align: 'left' },
              { name: 'contrato', field: 'contrato', label: this.$t('form_contrato'), align: 'left' },
              { name: 'totalContrato', field: 'totalContrato', label: this.$t('text_costoContrato'), align: 'left' },
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
