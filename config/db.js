const mongoose = require('mongoose');

const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('DB is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB is disconnected');
});

process.on('SIGINT', async() => {
    mongoose.connection.close(() => {
        console.log('Disconnected from DB');
        process.exit(1);
    });
});

module.exports = db;