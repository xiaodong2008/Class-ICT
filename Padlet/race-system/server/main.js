const server = require("socket.io").Server;
const webio = new server(1070, {
    cors: {
        origin: "*"
    }
});
const clientio = new server(1077);
const os = require("os");
const mysql = require("./mysql");
mysql.connect({
    user: "xiaodong",
    password: "s14002373",
    database: "frc-rzs",
    host: "127.0.0.1"
})


const pages = {
    "/record/columns": require("./pages/record/keys"),
    "/record/get": require("./pages/record/get")
}

clientio.on("connection", socket => {
    socket.on("ping", () => {
        socket.emit("pong");
    });
    socket.on("insert", async data => {
        data = JSON.parse(data);
        // time(server local time), tag, tag_role(from tag-list.tag_role)
        const tag = data.tag
        const time = new Date().toLocaleString()
        
        // const tag_role = (((await mysql.exec("SELECT tag_role FROM tag_list WHERE tag = ?", [tag]))[0]).tag_role || "--")
        await mysql.exec(`INSERT INTO record (time, tag, tag_role) VALUES ('${time}', '${tag}', '${tag_role}')`)
        // to all web clients
        webio.emit("insert", JSON.stringify({
            time,
            tag,
            tag_role
        }))
    })
})

webio.on("connection", socket => {
    socket.on("ping", () => {
        socket.emit("pong");
    });
    // console.log(os.networkInterfaces());
    socket.on("get_info", () => {
        let ip = os.networkInterfaces()
        try {
        if (!ip.en0) ip = ip.lo0[0].address
        else ip = ip.en0[1].address
        } catch (e) {
            ip = "127.0.0.1"
        }
        socket.emit("info", {
            version: "1.0.0",
            // en0
            ip
        });
    });

    // clean up when client disconnects
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("request", msg => {
        msg = JSON.parse(msg);
        console.log(msg);
        if (!pages[msg.url])
            socket.emit("request", JSON.stringify({
                _request_id: msg._request_id,
                success: false,
                error: "Page not found",
                code: 404
            }));
        else {
            pages[msg.url](msg.data).then(data => {
                socket.emit("request", JSON.stringify({
                    _request_id: msg._request_id,
                    success: true,
                    data,
                    code: 200
                }));
            }).catch(err => {
                console.log(msg.url, err);
                socket.emit("request", JSON.stringify({
                    _request_id: msg._request_id,
                    success: false,
                    ...err
                }))
            })
        }
    })
});