// const session = require("express-session");
// const connectMongo = require("connect-mongo");

// // Tự động tìm đúng đối tượng chứa hàm create
// const MongoStore = connectMongo.create 
//     ? connectMongo 
//     : (connectMongo.default && connectMongo.default.create ? connectMongo.default : connectMongo);

// function configSession() {
//     // Nếu có hàm create thì dùng create, nếu không thì dùng new MongoStore
//     const store = typeof MongoStore.create === "function"
//         ? MongoStore.create({
//             mongoUrl: process.env.MONGODB_SESSION_URI,
//             collectionName: "sessions"
//         })
//         : new MongoStore({
//             mongoUrl: process.env.MONGODB_SESSION_URI,
//             collectionName: "sessions"
//         });

//     return session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//         cookie: {
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60
//         }
//     });
// }

// module.exports = configSession;
const session = require("express-session");
const connectMongo = require("connect-mongo");

const MongoStore = connectMongo.create 
    ? connectMongo 
    : (connectMongo.default && connectMongo.default.create ? connectMongo.default : connectMongo);

function configSession() {
    const store = typeof MongoStore.create === "function"
        ? MongoStore.create({
            mongoUrl: process.env.MONGODB_SESSION_URI,
            collectionName: "sessions"
        })
        : new MongoStore({
            mongoUrl: process.env.MONGODB_SESSION_URI,
            collectionName: "sessions"
        });

    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true, // Tự động ghi ngay session mới vào Atlas
        store: store,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 24 giờ
        }
    });
}

module.exports = configSession;