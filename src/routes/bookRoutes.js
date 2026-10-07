// const express = require('express');
// const router = express.Router();
// const { listBooks, showAddForm, addBook } = require('../controllers/bookController');

// router.get('/', listBooks);
// router.get('/add', showAddForm);
// router.post('/add', addBook);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { listBooks, showAddForm, addBook } = require('../controllers/bookController');

router.get('/', listBooks);
router.get('/add', showAddForm);
router.post('/add', addBook);

module.exports = router;