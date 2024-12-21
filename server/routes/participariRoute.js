const express = require('express');
const router = express.Router();
const ParticipareController = require('../controllers/participareController');

router.get('/', ParticipareController.getAll);
router.get('/:id', ParticipareController.getById);
router.post('/', ParticipareController.create);
router.delete('/:id', ParticipareController.delete);

module.exports = router;
