<template>
  <!-- <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :key="indexKey"
  /> -->
  <client-only>
    <component
      :is="apexchart"
      height="160"
      width="320"
      type="pie"
      :options="chartOptions"
      :series="value"
      :key="indexKey"
    />
  </client-only>
</template>
<script>
// import { Pie } from 'vue-chartjs/legacy'

// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale
// } from 'chart.js'

// ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  components: {
    
  },

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
    series: Array,
    // chartId: {
    //   type: String,
    //   default: 'pie-chart'
    // },
    // datasetIdKey: {
    //   type: String,
    //   default: 'label'
    // },
    // width: {
    //   type: Number,
    //   default: 200
    // },
    // height: {
    //   type: Number,
    //   default: 200
    // },
    // cssClasses: {
    //   default: '',
    //   type: String
    // },
    // styles: {
    //   type: Object,
    //   default: () => {}
    // },
    // plugins: {
    //   type: Array,
    //   default: () => []
    // }
  },
  watch : {
    series () {
      this.indexKey += 1
      this.value = this.series
      console.log(123, this.value)
    }
  },

  data() {
    return {
        indexKey: 0,
        chartOptions: {
        labels: ['Cacbohydrat', 'Cenluloza', 'Lipit', 'Protein'],
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
        value: []
        // }
      // chartData: {
      //   labels: ['Protein', 'Lipit', 'Cacbohydrat', 'Cenluloza'],
      //   datasets: [
      //     {
      //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      //       data: []
      //     }
      //   ]
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false
      // }
    }
  },
  // computed: {
  //   'chartData.datasets[0].data' () {
  //     return this.series
  //   }
  // },
  mounted () {
    this.value = this.series
    console.log(this.chartData)
  }
}
</script>