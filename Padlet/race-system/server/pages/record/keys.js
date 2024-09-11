const mysql = require("../../mysql")

module.exports = function () {
    return new Promise((resolve, reject) => {
        mysql.exec("select COLUMN_NAME from information_schema.columns where table_name='record' and table_schema='frc-rzs'").then(e => {
            // into an array
            let keys = [];
            for (const packet of e) {
                keys.push(packet.COLUMN_NAME)
            }
            resolve(keys)
        }).catch(err => reject({
            error: "Database error: " + err,
            code: 500
        }))
    })
}