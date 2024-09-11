<script>
import Filter from "@/components/filter.vue";
import VueApexCharts from "vue3-apexcharts";
import Select from "./select.vue";
import Rank from "@/pages/overview/rank.vue";

export default {
  name: "overview",
  components: {
    Rank,
    Filter,
    ApexCharts: VueApexCharts,
    Select,
  },
  data() {
    return {
      data: [],
      filters: {
        form: "all",
        class: "all",
        gender: "all",
      },
      // who runs the most
      sumChart: {
        series: [44, 55, 13, 43, 20, 1, 1],
        chartOptions: {
          title: {
            text: "Total: 261 laps",
            align: 'center',
            margin: 40,
            style: {
              fontSize: '15px',
              fontWeight: '600',
              color: '#263238'
            },
          },
          colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#26a69a', '#546E7A'],
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Form 1 Students', 'Form 2 Students', 'Form 3 Students', 'Form 4 Students', 'Form 5 Students', 'Form 6 Students', 'Other'],
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
      },
    }
  },
  methods: {
    updateData(data) {
      this.data = data
    }
  }
}
</script>

<template>
  <div class="page block">
    <span style="display: block">Overview</span>
    <Filter @update="updateData"/>
    <Select/>
    <a-space>
      Rank filter:
      <a-select style="width: 140px" v-model:value="filters.form">
        <a-select-option value="all">All Form</a-select-option>
        <a-select-option value="1">Form 1</a-select-option>
        <a-select-option value="2">Form 2</a-select-option>
        <a-select-option value="3">Form 3</a-select-option>
        <a-select-option value="4">Form 4</a-select-option>
        <a-select-option value="5">Form 5</a-select-option>
        <a-select-option value="6">Form 6</a-select-option>
      </a-select>
      Class:
      <a-select style="width: 140px" v-model:value="filters.class">
        <a-select-option value="all">All Class</a-select-option>
        <a-select-option value="A">Class A</a-select-option>
        <a-select-option value="B">Class B</a-select-option>
        <a-select-option value="C">Class C</a-select-option>
        <a-select-option value="D">Class D</a-select-option>
        <a-select-option value="E">Class E</a-select-option>
      </a-select>
      Gender:
      <a-select style="width: 140px" v-model:value="filters.gender">
        <a-select-option value="all">Man/Female</a-select-option>
        <a-select-option value="M">Man</a-select-option>
        <a-select-option value="F">Female</a-select-option>
      </a-select>
    </a-space>
    <div style="display: flex; width: 100%; flex-grow: 1">
      <div style="height: 100%; display: grid; place-items: center; flex: 1">
        <Rank :data="data" :filters="filters"/>
      </div>
      <div style="height: 100%; display: grid; place-items: center; flex: 1; justify-content: start">
        <ApexCharts type="pie" width="550" :options="sumChart.chartOptions" :series="sumChart.series"/>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page {
  > * {
    margin-bottom: 10px;
  }
}
</style>