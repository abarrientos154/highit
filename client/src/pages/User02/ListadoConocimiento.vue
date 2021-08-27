<template>
  <div>
    <Tabla titulo="Listado de Conocimientos" @mostrar="datos_vista" :columns="column" route="conocimientos" :btnNew="false" :eliminarBtn="false" :verBtn="true" />
    <q-dialog v-model="dialogo">
      <q-card class="" style="width:450px">
      <div class="q-pa-xl">
        <div class="column items-center justify-center">
          <div class="text-h6 text-bold">Informacion del conocimiento</div>
        </div>
          <div class="q-mt-md text-subtitle1">Nombre de conocimiento</div>
          <q-input filled v-model="form.name" disable/>
          <div class="q-mt-md text-subtitle1">Descripcion</div>
          <q-input v-model="form.descripcion" disable filled type="textarea"/>
          <div class="row justify-center items-center">
            <q-btn class="q-mx-md q-mt-md" :label="'Archivo ' + (index + 1)" color="primary" v-for="(item, index) in form.archivos" :key="index" push>
              <a :href="baseApi + form._id + '/' + index" style="position:absolute;width:100%; height:100%" ></a>
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Tabla from '../../components/Tablasecundaria'
import env from '../../env'
export default {
  components: { Tabla },
  data () {
    return {
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ],
      dialogo: false,
      form: {},
      baseApi: null
    }
  },
  mounted () {
    this.baseApi = env.apiUrl + 'archivo/'
  },
  methods: {
    datos_vista (id) {
      this.$api.get('conocimiento/' + id).then(res => {
        if (res) {
          this.form = res
        }
      })
      this.dialogo = true
    }
  }
}
</script>
