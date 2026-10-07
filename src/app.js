// require('dotenv').config();
// const express = require('express');
// const { engine } = require('express-handlebars');
// const configSession = require('./config/session');
// const bookRoutes = require('./routes/bookRoutes');

// const app = express();

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Kích hoạt Stateless Session
// app.use(configSession());

// // Routing
// app.use('/books', bookRoutes);
// app.get('/', (req, res) => {
//     res.render('home', {
//         title: 'Trang chủ - Quản lý Sách',
//         mssv: process.env.MSSV,
//         vatRate: process.env.VAT_RATE
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server chạy tại: http://localhost:${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const configSession = require('./config/session');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kích hoạt Stateless Session
app.use(configSession());

// Đếm lượt xem trang chủ lưu trực tiếp vào session
app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    res.render('home', {
        title: 'Trang chủ - Quản lý Sách',
        mssv: process.env.MSSV,
        vatRate: process.env.VAT_RATE,
        views: req.session.views
    });
});

app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại: http://localhost:${PORT}`);
});