<script>
export default {
  name: "rank",
  props: {
    data: {
      type: Array,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rank: [],
      showList: [],
    };
  },
  watch: {
    data: {
      handler() {
        this.updateRank();
      },
    },
    filters: {
      handler() {
        this.updateRank();
      },
      deep: true,
    },
  },
  methods: {
    updateRank() {
      const count = {};
      const dataFiltered = this.$props.data.filter((record) => {
        if (
          this.$props.filters.form !== "all" &&
          record.user_class[0] !== this.$props.filters.form
        )
          return false;
        if (
          this.$props.filters.class !== "all" &&
          record.user_class[1] !== this.$props.filters.class
        )
          return false;
        if (
          this.$props.filters.gender !== "all" &&
          record.user_gender !== this.$props.filters.gender
        )
          return false;
        return true;
      });
      dataFiltered.forEach((record) => {
        if (!count[record.user_id]) count[record.user_id] = 0;
        count[record.user_id]++;
      });
      let rank = Object.keys(count)
        .map((user_id) => {
          return {
            user_id,
            lap_count: count[user_id],
            average_time:
              this.$props.data
                .filter((record) => record.user_id === user_id)
                .reduce((acc, cur) => acc + cur.record_time, 0) /
              count[user_id],
            ...this.$props.data.find((record) => record.user_id === user_id),
          };
        })
        .sort((a, b) => b.lap_count - a.lap_count);

      // group out
      const groupByLap = {},
        exist = [];
      rank.forEach((user) => {
        if (!groupByLap[user.lap_count]) {
          groupByLap[user.lap_count] = [];
          exist.push(user.lap_count);
        }
        groupByLap[user.lap_count].push(user);
      });
      // sort
      for (let key in groupByLap) {
        groupByLap[key] = groupByLap[key].sort(
          (a, b) => a.average_time - b.average_time
        );
      }
      console.log("groupByLap", groupByLap);
      // merge back
      exist.sort((a, b) => b - a);
      rank = [];
      exist.forEach((lap) => {
        rank = rank.concat(groupByLap[lap]);
      });
      console.log("rank", rank);
      this.showList = rank;
    },
  },
};
</script>

<template>
  <div class="box">
    <span class="title">Rank</span>
    <div class="list">
      <div class="stat" v-for="(user, index) in showList" :key="index">
        <div style="padding: 10px; white-space: nowrap">
          {{ user.user_name_zh }} {{ user.user_name_en }}
        </div>
        <div class="right">
          <span style="width: 55px">{{ user.lap_count }} laps</span>
          <span style="width: 60px">Class {{ user.user_class }}</span>
          <span style="width: 50px">{{
            user.user_gender === "M" ? "Man" : "Female"
          }}</span>
          <span style="width: 150px"
            >Average time: {{ user.average_time.toFixed(2) }}s</span
          >
        </div>
      </div>
      <div class="stat" v-if="showList.length === 0">
        <div style="text-align: center; width: 100%; padding: 10px">
          -- No records for the specified time period --
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .list {
    flex-grow: 1;
    overflow: auto;
  }

  .title {
    font-size: 15px;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }

  .stat {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #b2b2b2;

    &:first-child {
      border-top: 1px solid #b2b2b2;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;

      > * {
        margin: 0 10px;
      }
    }
  }
}
</style>
