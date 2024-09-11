<script>
import Filter from "@/components/filter.vue";
import VueApexCharts from "vue3-apexcharts";
import Select from "./select.vue";
import Rank from "@/pages/overview/rank.vue";

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

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
            align: "center",
            margin: 40,
            style: {
              fontSize: "15px",
              fontWeight: "600",
              color: "#263238",
            },
          },
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#26a69a",
            "#546E7A",
          ],
          chart: {
            width: 450,
            type: "pie",
          },
          labels: [
            "Form 1 Students",
            "Form 2 Students",
            "Form 3 Students",
            "Form 4 Students",
            "Form 5 Students",
            "Form 6 Students",
            "Other",
          ],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    updateData(data) {
      this.data = data;
    },
  },
  mounted() {
    dragElement(document.querySelector("#sumChart"));
  },
};
</script>

<template>
  <div class="page block">
    <span style="display: block">Overview</span>
    <Filter @update="updateData" />
    <Select />
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
      <div style="height: 100%; display: grid; place-items: center; flex: 1.5">
        <Rank :data="data" :filters="filters" />
      </div>
      <div
        style="
          height: 100%;
          display: grid;
          place-items: center;
          flex: 1;
          justify-content: start;
        "
      >
        <ApexCharts
          type="pie"
          width="450"
          id="sumChart"
          style="
            position: absolute;
            top: 180px;
            width: 450px;
            right: 80px;
            box-shadow: 0 0 5px gray;
            border-radius: 10px;
          "
          :options="sumChart.chartOptions"
          :series="sumChart.series"
        />
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
