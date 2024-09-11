import { io } from "socket.io-client";
import { message } from "ant-design-vue";
import { rand } from "jsfast";

const api = {
  connect() {
    message.success({
      content: "Connected to server",
      key: "api_connecting",
    });
  },
  post(url, data) {
    return new Promise((resolve) => {
      if (url == "/record/get") {
        const user_list = [
          {
            user_id: "s2020007",
            user_class: "4E",
            user_name_en: "Li Wan Chak",
            user_name_zh: "李運澤",
            user_gender: "F",
          },
          {
            user_id: "s2020097",
            user_class: "6B",
            user_name_en: "Wong Chi Fung",
            user_name_zh: "黃志峰",
            user_gender: "M",
          },
          {
            user_id: "s2020077",
            user_class: "4A",
            user_name_en: "Li Kai Mung",
            user_name_zh: "李佳萌",
            user_gender: "F",
          },
          {
            user_id: "s2020001",
            user_class: "4A",
            user_name_en: "Chan Siu Ming",
            user_name_zh: "陳小明",
            user_gender: "M",
          },
          {
            user_id: "s2020002",
            user_class: "4A",
            user_name_en: "Chan Tai Men",
            user_name_zh: "陳大文",
            user_gender: "M",
          },
          {
            user_id: "s2016007",
            user_class: "1B",
            user_name_en: "Anya Forger",
            user_name_zh: "安妮亞",
            user_gender: "F",
          },
        ];

        // generate random record
        const record_list = [];

        for (let i = 0; i < 100; i++) {
          const user = user_list[Math.floor(Math.random() * user_list.length)];
          record_list.push({
            user_id: user.user_id,
            tag: Math.floor(Math.random() * 1000000000),
            tag_role: "student",
            record_date: `2024-08-${Math.floor(
              Math.random() * 30
            )} ${Math.floor(Math.random() * 24)}:${Math.floor(
              Math.random() * 60
            )}:${Math.floor(Math.random() * 60)}`,
            record_time: Math.floor(Math.random() * 100),
            user_class: user.user_class,
            user_name_en: user.user_name_en,
            user_name_zh: user.user_name_zh,
            user_gender: user.user_gender,
          });
        }

        resolve(record_list);
      } else if (url === "/record/columns") {
        resolve([
          "user_id",
          "tag",
          "tag_role",
          "record_date",
          "record_time",
          "user_class",
          "user_name_en",
          "user_name_zh",
          "user_gender",
        ]);
      }
    });
  },
  waitConnect(callback) {
    if (this.connected) {
      callback();
    } else {
      this.socket.then(callback);
    }
  },
  getInfo() {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        if (this.infoLoad) resolve(this.info);
        else this.info.then((e) => resolve(e)).catch((e) => reject(e));
      } else {
        this.waitConnect(() => {
          if (this.infoLoad) resolve(this.info);
          else this.info.then((e) => resolve(e)).catch((e) => reject(e));
        });
      }
    });
  },
  socket: null,
  info: {
    version: "1.0.0",
    // en0
    ip: "127.0.0.1",
  },
  infoLoad: true,
  connected: true,
};

export default api;
