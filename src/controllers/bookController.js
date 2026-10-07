// const { ReadBook, WriteBook } = require('../models/bookModels');

// const prefix = process.env.PRODUCT_PREFIX || '237';
// const vatRate = Number(process.env.VAT_RATE) || 11;

// // Hiển thị danh sách sách (dùng ReadBook)
// async function listBooks(req, res) {
//     try {
//         const books = await ReadBook.find().lean();
//         res.render('books/index', {
//             title: 'Danh sách Sách',
//             books,
//             success: req.query.success === '1',
//             mssv: process.env.MSSV,
//             vatRate
//         });
//     } catch (err) {
//         res.status(500).send('Lỗi đọc dữ liệu: ' + err.message);
//     }
// }

// // Hiển thị form thêm sách
// function showAddForm(req, res) {
//     res.render('books/add', {
//         title: 'Thêm Sách Mới',
//         mssv: process.env.MSSV,
//         vatRate,
//         prefix
//     });
// }

// // Xử lý thêm sách (dùng WriteBook)
// async function addBook(req, res) {
//     try {
//         const { productCode, name, price } = req.body;

//         // Bộ lọc tiền tố 3 số cuối MSSV
//         if (!productCode.startsWith(prefix)) {
//             return res.status(400).send(`Mã sản phẩm bắt buộc phải có tiền tố là ${prefix}`);
//         }

//         const basePrice = Number(price);
//         if (isNaN(basePrice) || basePrice < 0) {
//             return res.status(400).send('Giá sách không hợp lệ');
//         }

//         // Tự động tính giá sau thuế VAT = 11%
//         const finalPrice = Math.round(basePrice * (1 + vatRate / 100));

//         await WriteBook.create({
//             productCode,
//             name,
//             price: basePrice,
//             finalPrice
//         });

//         res.redirect('/books?success=1');
//     } catch (err) {
//         res.status(500).send('Lỗi thêm sách: ' + err.message);
//     }
// }

// module.exports = { listBooks, showAddForm, addBook };
const { ReadBook, WriteBook } = require('../models/bookModels');

const prefix = process.env.PRODUCT_PREFIX || '237';
const vatRate = Number(process.env.VAT_RATE) || 11;

async function listBooks(req, res) {
    try {
        const books = await ReadBook.find().lean();
        res.render('books/index', {
            title: 'Danh sách Sách',
            books,
            success: req.query.success === '1',
            mssv: process.env.MSSV,
            vatRate
        });
    } catch (err) {
        res.status(500).send('Lỗi đọc dữ liệu: ' + err.message);
    }
}

function showAddForm(req, res) {
    res.render('books/add', {
        title: 'Thêm Sách Mới',
        mssv: process.env.MSSV,
        vatRate,
        prefix
    });
}

async function addBook(req, res) {
    try {
        const { productCode, name, price } = req.body;

        // Bắt lỗi tiền tố 3 số cuối MSSV
        if (!productCode || !productCode.startsWith(prefix)) {
            return res.status(400).send(`Mã sản phẩm bắt buộc phải có tiền tố là ${prefix} (ví dụ: ${prefix}_01)`);
        }

        const basePrice = Number(price);
        if (isNaN(basePrice) || basePrice < 0) {
            return res.status(400).send('Giá sách không hợp lệ');
        }

        // Tự động tính giá sau thuế VAT = 11%
        const finalPrice = Math.round(basePrice * (1 + vatRate / 100));

        await WriteBook.create({
            productCode,
            name,
            price: basePrice,
            finalPrice
        });

        res.redirect('/books?success=1');
    } catch (err) {
        res.status(500).send('Lỗi thêm sách: ' + err.message);
    }
}

module.exports = { listBooks, showAddForm, addBook };