<template>
  <div>
    <Tabla titulo="Listado de Usuarios" :columns="column" route="user2" :btnNew="true" />
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
        { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
        { name: 'tipo_usuario', field: 'tipo_usuario', label: 'Tipo de usuario', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' }
      ]
    }
  }
}
</script>
