<script>
import { date } from "jsfast";
import api from "@/api";
import { message } from "ant-design-vue";

export default {
  name: "Filter",
  data() {
    return {
      range: "all",
      searchDate: "",
      searchRange: [],
    };
  },
  methods: {
    updateTable() {
      const body = {};

      // generate body
      if (this.range === "today") {
        body.type = "date";
        body.value = date.string("Y-M-D");
      } else if (this.range === "date") {
        if (!this.searchDate) return;
        body.type = "date";
        body.value = date.string(this.searchDate.toDate().getTime(), "Y-M-D");
      } else if (this.range === "range") {
        if (!this.searchRange[0] || !this.searchRange[1]) return;
        body.type = "range";
        body.value = [
          date.string(this.searchRange[0].toDate().getTime(), "Y-M-D"),
          date.string(this.searchRange[1].toDate().getTime(), "Y-M-D"),
        ];
      } else if (this.range === "all") {
        body.type = "all";
      }

      console.log("body", body);
      api.post("/record/get", body).then((data) => {
        this.$emit(
          "update",
          data.map((record) => {
            // utc time to y-m-d h:i:s
            record.record_date = date.string(
              "Y-M-D h:m:s",
              new Date(record.record_date).getTime()
            );
            return record;
          })
        );
        message.success(data.length + " records found from all data");
      });
    },
  },
  mounted() {
    this.updateTable();
  },
};
</script>

<template>
  <a-space style="display: flex">
    Search:
    <a-select @change="updateTable" v-model:value="range" style="width: 120px">
      <a-select-option value="today">Today</a-select-option>
      <a-select-option value="date">Date</a-select-option>
      <a-select-option value="range">Range</a-select-option>
      <a-select-option value="all">All</a-select-option>
    </a-select>
    <a-date-picker
      v-if="range === 'date'"
      v-model:value="searchDate"
      @change="updateTable"
    />
    <a-range-picker
      v-if="range === 'range'"
      v-model:value="searchRange"
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['Start Time', 'End Time']"
      @change="updateTable"
      @ok="updateTable"
    />
    <a-button style="margin-left: auto" @click="updateTable()">Search Record</a-button>
  </a-space>
</template>

<style scoped lang="less"></style>
