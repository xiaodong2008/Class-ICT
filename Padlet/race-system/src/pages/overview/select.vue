<script>
import Filter from "@/components/filter.vue";
import {
  PieChartOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "chartFilter",
  components: {
    Filter,
    PieChartOutlined,
  },
  data() {
    return {
      chart: "lapCount-form"
    };
  }
}
</script>

<template>
  <a-space>
    Select a chart:
    <a-select v-model:value="chart" @change="$emit('update', chart)" style="width: 300px">
      <a-select-opt-group>
        <template #label>
          <PieChartOutlined/>
          Pie Chart
        </template>
        <a-select-option value="lapCount-form">
          Laps of each Form
        </a-select-option>
        <a-select-option value="lapCount-class-?:form">
          Laps of each Class
        </a-select-option>
        <a-select-option value="lapCount-gender">
          Laps of boys/girls from school
        </a-select-option>
        <a-select-option value="lapCount-gender-?:form">
          Laps of boys/girls from Form
        </a-select-option>
      </a-select-opt-group>
    </a-select>
  </a-space>
</template>

<style scoped lang="less">

</style>