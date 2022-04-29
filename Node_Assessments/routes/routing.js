var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/authors', controller.authors);
router.get('/books', controller.books);
router.get('/magazines', controller.magazine);
router.get('/add-book', controller.addBook);
router.post('/add-book', controller.bookDetails);
router.get('/add-magazine', controller.addMagazine);
router.post('/add-magazine', controller.magazineDetails);
router.post('/search', controller.findBookMag);

module.exports = router;