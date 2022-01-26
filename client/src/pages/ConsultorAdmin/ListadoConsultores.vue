<template>
  <div>
    <Tabla v-if="info" :titulo="$t('ruta_consultores').toUpperCase()" :subtitulo="$t('subtitulo_moduloConsultores')" :columns="column" route="user_consultor" :route_id="user.empresa" :selectBtn="true" :selectFlt="false"/>
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
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'last_name', field: 'last_name', label: this.$t('form_apellido'), align: 'left' },
        { name: 'email', field: 'email', label: this.$t('form_correo'), align: 'left' },
        { name: 'department', field: 'department', label: this.$t('form_departamento'), align: 'left' }
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
