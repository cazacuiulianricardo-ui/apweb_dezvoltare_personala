const express = require('express');
const router = express.Router();
const DrepturiController = require('../controllers/drepturiController');

router.get('/', DrepturiController.getAll);
router.get('/:id', DrepturiController.getById);
router.post('/', DrepturiController.create);
router.put('/:id', DrepturiController.update);
router.delete('/:id', DrepturiController.delete);

module.exports = router;
