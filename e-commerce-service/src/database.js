const mongoose = require("mongoose");

const URI = process.env.MONGO_DB;

mongoose.connect(URI, {
    useNewUrlParser: true,
    dbName: "io-shop",
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(db => console.log("Database is connected"))
    .catch(err => console.error(err));
