<template>
  <div>
    <Tabla :titulo="$t('ruta_historialSlt').toUpperCase()" :subtitulo="$t('subtitulo_moduloHistorialSlt')" :columns="column" route="solicitudes_history" :verBtn="true" :editarBtn="false" :inputBtn="true" :selectFlt="false" :eliminarBtn="false"/>
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
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.column = [
            { name: 'description', field: 'description', label: this.$t('form_descripcion'), align: 'left' },
            { name: 'prioridad', field: 'prioridad', label: this.$t('form_prioridad'), align: 'left' },
            { name: 'categoria', field: 'categoria', label: this.$t('form_categoria'), align: 'left' },
            { name: this.rol === 3 ? 'empresa' : 'consultor', field: this.rol === 3 ? 'empresa' : 'consultor', label: this.rol === 3 ? this.$t('form_cliente') : this.$t('rol3'), align: 'left' },
            { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
          ]
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>
