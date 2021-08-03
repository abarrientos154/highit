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
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Tabla from '../../components/Tablasecundaria'
export default {
  components: { Tabla },
  data () {
    return {
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' }
      ],
      dialogo: false,
      form: {}
    }
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
