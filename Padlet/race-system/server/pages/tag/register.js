// const mysql = require("../../mysql")

// module.exports = function (data) {
//     return new Promise((resolve, reject) => {
//         // is tag in database

//         mysql.exec("select * from tag where tag_id = ?", [data.tag_id]).then(e => {
//             if (e.length) {
//                 // update tag info

//             } else {
//                 // register a new tag
//                 mysql.exec("insert into tag (tag_id, user_id, user_gender, user_name_zh, user_name_en) values (?, ?, ?, ?, ?)", [data.tag_id, data.user_id, data.user
//             }
//         })
//     })
// }