<template>
  <div>
    <div class="bordes q-mb-md">
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">HOME PRINCIPAL</div>
        <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
      </div>
    </div>
    <div class="text-center text-h5 text-bold">Estadistica de empresas</div>
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
      chartData: [
        ['Element', 'Usuarios', { role: 'style' }]
      ],
      chartOptions: {
        legend: { position: 'none' }
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
          for (const i of res) { this.chartData.push([i.name, i.cantUsers, 'color: gray']) }
        }
        this.info = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
}
</style>
