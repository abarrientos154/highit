<template>
  <div>
    <Tabla v-if="info" :titulo="$t('ruta_consultoresSlt').toUpperCase()" :subtitulo="$t('subtitulo_moduloConsultoresSlt')" :columns="column" route="solicitudes" :route_id="user.empresa" :verBtn="true" :editarBtn="false" :selectBtn="true" :selectFlt="false" :eliminarBtn="false"/>
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
        { name: 'description', field: 'description', label: this.$t('form_descripcion'), align: 'left' },
        { name: 'prioridad', field: 'prioridad', label: this.$t('form_prioridad'), align: 'left' },
        { name: 'categoria', field: 'categoria', label: this.$t('form_categoria'), align: 'left' },
        { name: 'empresa', field: 'empresa', label: this.$t('form_cliente'), align: 'left' },
        { name: 'consultor', field: 'consultor', label: this.$t('rol3'), align: 'left' },
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
          this.info = true
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>
