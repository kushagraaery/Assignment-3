const express = require('express')
const BookController = require('../controller/book')
const router = express.Router();

router.get('/', BookController.findAll);
router.get('/:id', BookController.findOne);
router.post('/', BookController.create);
router.patch('/:id', BookController.update);
router.delete('/:id', BookController.destroy);

module.exports = router;