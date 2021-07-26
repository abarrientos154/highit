<template>
  <div>
    <Tabla titulo="Listado de Equipos" :columns="column" route="equipo" :btnNew="true" />
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
        { name: 'empresa', field: row => row.Empresa.name, label: 'Empresa Asociado', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' }
      ]
    }
  }
}
</script>
