<template>
  <div>
    <Tabla titulo="Listado de Conocimientos" :columns="column" route="conocimientos" :btnNew="true" :eliminarBtn="false" />
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
      ]
    }
  }
}
</script>
