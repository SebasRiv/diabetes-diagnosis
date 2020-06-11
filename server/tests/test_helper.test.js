const mongoose = require('mongoose');

// before(done => {
//     mongoose.connect("mongodb://localhost:27017/diagnosticos");
//     mongoose.connection
//         .once("open", () => {
//             console.log("Connected to DB test");
//             done();
//         })
//         .on("error", err => {
//             console.warn("Warning", err);
//         });
// });