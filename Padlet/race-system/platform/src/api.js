import { io } from "socket.io-client";
import { message } from "ant-design-vue";
import { rand } from "jsfast";

const api = {
  connect() {
    this.socket = new Promise((finish) => {
      message.loading({
        content: "Connecting to server...",
        key: "api_connecting",
        duration: 0,
      });
      console.log("test");

      // const socket = io('http://192.168.24.150:1070/');
      const socket = io("http://localhost:1070/");
      socket.on("connect", () => {
        message.success({
          content: "Connected to server",
          key: "api_connecting",
        });
        this.socket = socket;
        this.connected = true;
        this.info = new Promise((loadFin) => {
          socket.emit("get_info");
          socket.on("info", (e) => {
            loadFin(e);
            this.infoLoad = true;
            this.info = e;
          });
        });
        finish(socket);
        console.log("Connected to server");
        socket.emit("get_info");
      });
    });
  },
  post(url, data) {
    if (!this.connected) {
      return new Promise((resolve, reject) => {
        this.socket.then((s) => {
          this.post(url, data).then(resolve).catch(reject);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        let _request_id = rand(1000000, 9999999);
        this.socket.emit(
          "request",
          JSON.stringify({
            url,
            data: data ? data : {},
            _request_id,
          })
        );
        this.socket.on("request", (msg) => {
          msg = JSON.parse(msg);
          if (msg._request_id === _request_id) {
            console.log(msg);
            if (!msg.success) {
              console.error(`Error ${msg.code}: ${msg.error}`);
              message.error(msg.error);
              return reject(msg.error);
            }
            resolve(msg.data);
          }
        });
      });
    }
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
  info: null,
  infoLoad: false,
  connected: false,
};

export default api;
