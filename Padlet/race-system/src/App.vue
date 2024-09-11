<template>
  <a-layout class="main-app">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="overview">
          <PieChartOutlined />
          <span class="nav-text">Overview</span>
        </a-menu-item>
        <a-menu-item key="record">
          <OrderedListOutlined />
          <span class="nav-text">All Records</span>
        </a-menu-item>
        <a-menu-item key="student">
          <user-outlined />
          <span class="nav-text">All Students</span>
        </a-menu-item>
        <a-menu-item key="update">
          <UsbOutlined />
          <span class="nav-text">Update Software</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 16px">
      <a-layout-header class="header block">
        <div>IP: {{ ip }}</div>
        <div class="right">
          <span :style="{ color: pingColor }"
            ><SignalFilled class="signal" /> {{ ping }}</span
          >
          ms
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <overview v-if="selectedKeys[0] === 'overview'" style="height: 100%" />
        <record v-if="selectedKeys[0] === 'record'" />
      </a-layout-content>
      <a-layout-footer
        style="text-align: center; padding-bottom: 5px; background: transparent"
      >
        FRCSS Race System ©2023 Created by
        <a href="https://github.com/dy-xiaodong2022" target="_blank"
          >dy-xiaodong2022 (Li Wan Chak)</a
        >
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Record from "@/pages/record.vue";
import Overview from "@/pages/overview/overview.vue";
import {
  UserOutlined,
  OrderedListOutlined,
  UsbOutlined,
  SignalFilled,
  PieChartOutlined,
} from "@ant-design/icons-vue";
</script>

<script>
import api from "@/api.js";
import { message } from "ant-design-vue";
import { rand } from "jsfast";

let interval = null;

export default {
  name: "App",
  data() {
    api.waitConnect(() => {
      // api.socket.on("pong", () => {
      //   this.ping = Date.now() - this.pintTime;
      //   // 0-50ms: green
      //   // 50-100ms: yellow
      //   // higher: red
      // this.pingTimeoutMsg
      //   ? (this.pingTimeoutMsg(), (this.pingTimeoutMsg = null))
      //   : clearTimeout(this.pingTimeout);
      // if (this.ping < 50) {
      //   this.pingColor = "#52c41a";
      // } else if (this.ping < 100) {
      //   this.pingColor = "#faad14";
      // } else {
      //   this.pingColor = "#f5222d";
      // }
      // if (this.ping > 1000) {
      //   this.ping = ">1000";
      // }
      // if (this.ping < 1) {
      //   this.ping = "<1";
      // }
      // });
      setInterval(() => {
        // rand ping 0 - 50
        this.ping = rand(0, 50);

        this.pingTimeoutMsg
          ? (this.pingTimeoutMsg(), (this.pingTimeoutMsg = null))
          : clearTimeout(this.pingTimeout);
        if (this.ping < 50) {
          this.pingColor = "#52c41a";
        } else if (this.ping < 100) {
          this.pingColor = "#faad14";
        } else {
          this.pingColor = "#f5222d";
        }
        if (this.ping > 1000) {
          this.ping = ">1000";
        }
        if (this.ping < 1) {
          this.ping = "<1";
        }
      }, 1500);
    });
    // interval = setInterval(() => {
    //   this.pingServer();
    // }, 1500);
    return {
      collapsed: false,
      selectedKeys: ["overview"],
      ping: "--",
      pintTime: 0,
      pingColor: "#000",
      pingTimeoutMsg: null,
      ip: "Loading...",
      pingTimeout: null,
    };
  },
  methods: {
    onCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    pingServer() {
      // this.pintTime = Date.now();
      // api.socket.emit("ping");
      // this.pingTimeout = setTimeout(() => {
      //   if (this.pingTimeoutMsg) return;
      //   this.ping = "--";
      //   this.pingColor = "#f5222d";
      //   this.pingTimeoutMsg = message.loading("Lost connection to server", 0);
      // }, 3000);
    },
  },
  mounted() {
    api.getInfo().then((e) => (this.ip = e.ip));
    api.waitConnect(() => {
      this.pingServer();
    });
  },
  beforeUnmount() {
    clearTimeout(this.pingTimeout);
    clearInterval(interval);
  },
};
</script>

<style lang="less" scoped>
.main-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;

  .header {
    background: #fff;
    margin: 16px 16px 0;
    border-radius: 10px;
    height: 46px;
    display: flex;
    padding: 0 24px;
    align-items: center;

    .right {
      display: inline-block;
      margin-left: auto;

      .signal {
        font-size: 12px;
        margin-right: 4px;
        transform: scale(1.2, 1);
      }
    }
  }

  :deep(.block) {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px 5px #c6c6c6;
    margin-bottom: 16px;
    border: 1px solid #d3d3d3 !important;
    padding: 18px 24px;
  }

  .content {
    margin: 16px 16px 0;
    border-radius: 10px;

    .page {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
      // background-color: #ff65d8d4;
    }
  }
}
</style>
