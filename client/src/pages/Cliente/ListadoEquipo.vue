<template>
  <div>
    <Tabla titulo="Listado de Equipos" @mostrar="dialogo= true" :columns="column" route="equipo_consultor" :eliminarBtn="false" :editarBtn="false" :crearBtn="true" />

    <q-dialog v-model="dialogo">
      <q-card class="" style="width:450px">
      <div class="column items-end">
        <div class="bg-red q-mr-xl" style="width: 60px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
      </div>
      <div class="q-pa-xl">
        <div class="column items-center justify-center">
          <div class="text-h6 text-bold">Nueva solicitud</div>
          <div class="text-h7 text-grey">Crea una nueva solicitud para tu cliente</div>
        </div>
        <q-input v-model="text" placeholder="hasta 500 caracteres" filled type="textarea" />
        <div class="q-mt-md text-h7">Selecciona Prioridad</div>
        <q-select filled v-model="model" :options="options" />
        <div class="q-mt-md text-h7">Categoria</div>
        <q-select filled v-model="model" :options="options" />
        <div class="q-mt-md text-h7">Agenda la atencion</div>
        <q-input v-model="date" filled type="date" />
        <q-card-actions class="q-mt-md" align="center">
          <q-btn label="Crear solicitud" color="primary" style="width:80%" v-close-popup />
        </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      lista: {},
      model: '',
      date: '',
      text: '',
      dialogo: false,
      showModalEliminar: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, align: 'center' }
      ],
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  }
}
</script>
