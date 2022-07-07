<template>
  <client-only>
    <component
      :is="apexchart"
      height="160"
      width="320"
      type="pie"
      :options="chartOptions"
      :series="series"
    />
  </client-only>
</template>
<script>
export default {
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import('vue-apexcharts')
        }
      }
    }
  },
  
  props: {
    series: Array
  },

  data() {
    return {
        chartOptions: {
        labels: ['Protein', 'Lipit', 'Cacbohydrat', 'Cenluloza'],
        chart: {
            type: 'pie',
        },
        responsive: [{
            breakpoint: 480,
            options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
            }
        }]
        },
        }
    }
}
</script>