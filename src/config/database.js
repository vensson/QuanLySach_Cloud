// const mongoose = require('mongoose');

// const readConnection = mongoose.createConnection(process.env.MONGODB_READ_URI);
// const writeConnection = mongoose.createConnection(process.env.MONGODB_WRITE_URI);

// readConnection.on('connected', () => console.log('MongoDB READ connected.'));
// writeConnection.on('connected', () => console.log('MongoDB WRITE connected.'));

// readConnection.on('error', (err) => console.error('Lỗi Read DB:', err.message));
// writeConnection.on('error', (err) => console.error('Lỗi Write DB:', err.message));

// module.exports = { readConnection, writeConnection };
const mongoose = require('mongoose');

const readConnection = mongoose.createConnection(process.env.MONGODB_READ_URI);
const writeConnection = mongoose.createConnection(process.env.MONGODB_WRITE_URI);

readConnection.on('connected', () => console.log('MongoDB READ connected.'));
writeConnection.on('connected', () => console.log('MongoDB WRITE connected.'));

readConnection.on('error', (err) => console.error('Lỗi Read DB:', err.message));
writeConnection.on('error', (err) => console.error('Lỗi Write DB:', err.message));

module.exports = { readConnection, writeConnection };