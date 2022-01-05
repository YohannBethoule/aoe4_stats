<template>
  <div class="flex">
    <highcharts :options="chartOptions"></highcharts>
  </div>


</template>

<script>
export default {
  name: "RatingGraph",
  components: {},
  props: {
    ratingHistory: Array
  },
  beforeMount() {
  },
  data: function () {
    console.log(this.ratingHistory.map(change => new Date(change.timestamp * 1000).toISOString().slice(0, 10)))
    return {
      labels: this.ratingHistory.map(change => new Date(change.timestamp * 1000).toISOString().slice(0, 10)),

      value: this.ratingHistory.map(change => change.rating),
      chartOptions: {
        title: {
          text: 'Rating History'
        },

        xAxis: {
          type: 'datetime'
        },

        yAxis: {
          title: 'Elo'
        },

        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },

        tooltip: {
          headerFormat: '<b>{point.y}</b><br>',
          pointFormat: '{point.x:%e. %b}'
        },

        series: [{
          data: this.ratingHistory.reverse().map(change => [change.timestamp * 1000, change.rating]) // sample data
        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
          }]
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
