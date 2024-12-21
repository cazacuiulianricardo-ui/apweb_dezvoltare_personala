const express = require('express');
const router = express.Router();
const RecenzieController = require('../controllers/recenzieController');

router.get('/', RecenzieController.getAll);
router.get('/:id', RecenzieController.getById);
router.post('/', RecenzieController.create);
router.put('/:id', RecenzieController.update);
router.delete('/:id', RecenzieController.delete);

module.exports = router;
