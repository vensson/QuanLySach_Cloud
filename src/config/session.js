const session = require('express-session');
const MongoStore = require('connect-mongo');

function configSession() {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_SESSION_URI,
            collectionName: 'sessions'
        }),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 // 1 giờ
        }
    });
}

module.exports = configSession;