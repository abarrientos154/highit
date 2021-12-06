<template>
  <div class="q-pa-md">
    <div class="q-pb-md">
      <div class="text-h4 text-bold">PÁGINA PRINCIPAL</div>
      <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
      <q-select filled v-model="empresa" :options="empresas" label="Selecciona una empresa" map-options emit-value option-label="name" @input="filtrar()"/>
    </div>
    <div class="text-center text-h5 text-bold q-mb-sm">Estadisticas de usuarios por empresa</div>
    <div>
      <GChart v-if="info && chartData.length > 1" type="ColumnChart" :data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  components: { GChart },
  data () {
    return {
      info: false,
      empresas: [],
      empresa: null,
      chartData: [],
      chartOptions: {
        legend: { position: 'none' },
        series: {
          0: { targetAxisIndex: 0 }
        },
        vAxes: {
          0: { title: 'Cantidad de usuarios' }
        }
      }
    }
  },
  mounted () {
    this.getEmpresas()
  },
  methods: {
    getEmpresas () {
      this.$api.get('companys').then(res => {
        if (res) {
          this.chartData = [
            ['Element', 'Usuarios', { role: 'style' }]
          ]
          for (const i of res) { this.chartData.push([i.name, i.cantUsers, 'color: gray']) }
          this.empresas = res
          this.empresas.push({ name: 'Todas las empresas' })
        }
        this.info = true
      })
    },
    filtrar () {
      if (this.empresa) {
        if (this.empresa.name === 'Todas las empresas') {
          this.getEmpresas()
        } else {
          this.chartData = [
            ['Element', 'Usuarios', { role: 'style' }],
            [this.empresa.name, this.empresa.cantUsers, 'color: gray']
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
