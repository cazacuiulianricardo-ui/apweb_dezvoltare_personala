const express = require('express');
const router = express.Router();
const { makeInvoker } = require('awilix-express');

const api = makeInvoker(({ utilizatorController }) => ({
    getAll: (req, res) => utilizatorController.getAll(req, res),
    getById: (req, res) => utilizatorController.getById(req, res),
    create: (req, res) => utilizatorController.create(req, res),
    update: (req, res) => utilizatorController.update(req, res),
    delete: (req, res) => utilizatorController.delete(req, res),
    softDelete: (req, res) => utilizatorController.softDelete(req, res),
    restore: (req, res) => utilizatorController.restore(req, res),
}));

router.get('/test', async (req, res) => {
    try {
        const utilizatorRepository = req.container.resolve('utilizatorRepository');
        const allUsers = await utilizatorRepository.getAllUtilizatoriIncludingDeleted();
        res.json(allUsers);
    } catch (error) {
        console.error('Eroare la /utilizatori/test:', error);
        res.status(500).json({
            message: 'Eroare la obținerea tuturor utilizatorilor (inclusiv șterși logic).',
            error: error.message
        });
    }
});

router.get('/', api('getAll'));
router.post('/', api('create'));


router.put('/soft-delete/:id', api('softDelete'));
router.put('/restore/:id', api('restore'));

router.put('/:id', api('update'));
router.delete('/:id', api('delete'));
router.get('/:id', api('getById'));

module.exports = router;
