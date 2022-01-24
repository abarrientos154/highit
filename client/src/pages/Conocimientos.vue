<template>
  <div>
    <Tabla v-if="rol" :titulo="$t('titulo_moduloConocimientos')" :subtitulo="$t('subtitulo_moduloConocimientos')" @mostrar="datos_vista" :columns="column" route="conocimientos" :btnNew="rol === 3 ? true : false" :editarBtn="rol === 3 ? true : false" :eliminarBtn="false" :verBtn="true" />
    <q-dialog v-model="dialogo">
      <q-card class="" style="width:450px">
      <div class="q-pa-xl">
        <div class="column items-center justify-center">
          <div class="text-h6 text-bold">{{$t('text_datosConocimiento')}}</div>
        </div>
          <div class="q-mt-md text-subtitle1">{{$t('form_nombre')}}</div>
          <q-input filled v-model="form.name" disable/>
          <div class="q-mt-md text-subtitle1">{{$t('form_descripcion')}}</div>
          <q-input v-model="form.descripcion" disable filled type="textarea"/>
          <div class="row justify-center items-center">
            <q-btn class="q-mx-md q-mt-md" :label="$t('form_archivo') + ' ' + (index + 1)" color="primary" v-for="(item, index) in form.archivos" :key="index" push>
              <a :href="baseApi + form._id + '/' + index" style="position:absolute;width:100%; height:100%" ></a>
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Tabla from '../components/TableActions'
import env from '../env'
export default {
  components: { Tabla },
  data () {
    return {
      rol: null,
      column: [
        { name: 'name', field: 'name', label: this.$t('form_nombre'), align: 'left' },
        { name: 'Action', label: this.$t('text_acciones'), field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ],
      dialogo: false,
      form: {},
      baseApi: null
    }
  },
  mounted () {
    this.userLogueado()
    this.baseApi = env.apiUrl + 'archivo/'
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
        }
        this.$q.loading.hide()
      })
    },
    datos_vista (id) {
      this.$api.get('conocimiento/' + id).then(res => {
        if (res) {
          this.form = res
          this.dialogo = true
        }
      })
    }
  }
}
</script>
