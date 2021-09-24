<template>
  <div>
    <Tabla titulo="Listado de Equipos" :columns="column" route="equipo" :btnNew="true" :selectBtn="true" :selectFlt="false"/>
  </div>
</template>
<script>
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      lista: {},
      showModalEliminar: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
      ]
    }
  }
}
</script>
