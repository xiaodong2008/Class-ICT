<template>
  <div class="page block">
    <span style="display: block">All Records</span>
    <Filter @update="updateTable"/>
    <a-space style="display: flex">
      Filter:
      <a-select
          v-model:value="filter"
          mode="tags"
          style="width: 40vw"
          placeholder="Filters"
          :options="columns"
          @change="updateFilter"
      ></a-select>
    </a-space>
    <a-table :columns="show_columns" :data-source="data || []" :loading="data === null">
      <template #bodyCell="{ column, index }">
        <span v-if="column.key == 'action'" style="cursor: pointer; user-select: none; color: red;">Delete</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import api from "@/api.js";
import {message} from "ant-design-vue";
import {date} from "jsfast";
import Filter from "@/components/filter.vue";

export default {
  name: "Record",
  components: {Filter},
  data() {
    api.post("/record/columns").then((res) => {
      console.log("columns result:", res);
      let weight = 1;
      this.columns = res.map((column) => {
        // first letter to uppercase
        let val = column[0].toUpperCase() + column.slice(1)
        return {
          value: val,
          label: val,
          weight: weight++,
        };
      });
      this.columns.push({
        value: "Action",
        label: "Action",
        weight: 999,
      });
      this.updateFilter()
    });
    // api.socket.on("insert", msg => {
    //   let newData = {}

    //   data.unshift()
    // })
    return {
      show_columns: [{}],
      data: null,
      // default filter inside arr
      filter: ["Record_date", "User_class", "User_name_zh", "User_name_en", "Action"],
      columns: []
    };
  },
  methods: {
    updateTable(data) {
      this.data = data;
    },
    updateFilter() {
      console.log("this.columns", this.columns);
      // if there is some filter not in database, return error
      for (let column of this.filter) {
        if (!this.columns.find((c) => c.label === column)) {
          return message.error(`Column {${column}} not in database`);
        }
      }
      this.show_columns = this.filter
          .map((column) => {
            return {
              title: column,
              key: column.toLowerCase(),
              dataIndex: column.toLowerCase(),
              weight: this.columns.find((c) => (console.log(c, column), c.label == column)).weight,
            };
          })
          .sort((a, b) => {
            return a.weight - b.weight;
          });
      console.log(this.show_columns);
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  > * {
    margin-bottom: 10px;
  }
}
</style>
