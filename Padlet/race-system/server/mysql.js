const sql = require("mysql")

let connection

// config: host, user, password, database
function connect(config) {
    return new Promise((resolve, reject) => {
        connection = sql.createConnection(config)
        connection.connect(e => {
            if (e) {
                console.error("MySQL error when connecting: " + e);
                reject(e)
            }
            else {
                console.log("MySQL connected");
                resolve()
            }
        })
        connection.on("error", err => {
            console.log("MySQL error: " + err)
            console.log("Reconnecting...")
            connection = connect(config).then(() => {
                console.log("Reconnected")
            })
        })
    })
}

function exec(command, params) {
    // if connection is Promise, wait for connection
    if (connection instanceof Promise) return new Promise((resolve, reject) => {
        connection.then(() => {
            exec(command, params).then(resolve).catch(reject)
        })
    })

    return new Promise((resolve, reject) => {
        connection.query(command, params, (err, result) => {
            console.log("exec", command)
            console.log("result", result);
            if (err) {
                reconnect()
                reject(err)
            }
            else resolve(result)
        })
    })
}

function reconnect() {
    console.log("Reconnecting...")
    connection = connect(connection.config)
}

module.exports = {
    connect,
    exec,
    connection
}