<template>
  <div>
    <Tabla titulo="Listado de Equipos" :columns="column" route="equipo_cliente" :eliminarBtn="false" :editarBtn="false" :crearBtn="true" />
  </div>
</template>
<script>
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
