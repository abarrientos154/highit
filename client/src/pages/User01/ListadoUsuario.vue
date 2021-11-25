<template>
  <div>
    <Tabla titulo="Listado de Usuarios" :columns="column" route="user" :btnNew="true" :verBtn="true" :selectBtn="true" :selectFlt="false" />
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
        { name: 'Profile', label: 'Perfil', field: 'Profile', filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ]
    }
  }
}
</script>
