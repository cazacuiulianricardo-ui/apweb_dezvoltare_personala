const express = require('express');
const router = express.Router();
const EvaluareController = require('../controllers/evaluareController');

router.get('/', EvaluareController.getAll);
router.get('/:id', EvaluareController.getById);
router.post('/', EvaluareController.create);
router.put('/:id', EvaluareController.update);
router.delete('/:id', EvaluareController.delete);

module.exports = router;
