const express = require('express');
const router = express.Router();
const { makeInvoker } = require('awilix-express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


const api = makeInvoker(({ abonamentController }) => ({
    getAll: (req, res) => abonamentController.getAll(req, res),
    getById: (req, res) => abonamentController.getById(req, res),
    create: (req, res) => abonamentController.create(req, res),
    update: (req, res) => abonamentController.update(req, res),
    delete: (req, res) => abonamentController.delete(req, res),
    subscribe: (req, res) => abonamentController.subscribe(req, res),
    getAbonamentActiv: (req, res) => abonamentController.getAbonamentActiv(req, res),
    upgradeAbonament: (req, res) => abonamentController.upgradeAbonament(req, res),
    getAvailableCourses: (req, res) => abonamentController.getAvailableCourses(req, res),
    getMyCourses: (req, res) => abonamentController.getMyCourses(req, res),
    switchAbonament: (req, res) => abonamentController.switchAbonament(req, res),
}));

router.post('/subscribe', authenticate, authorize(['client', 'instructor']), api('subscribe'));
router.get('/activ', authenticate, authorize(['client', 'instructor']), api('getAbonamentActiv'));
router.put('/upgrade', authenticate, authorize(['client', 'instructor']), api('upgradeAbonament'));
router.put('/switch', authenticate, authorize(['client', 'instructor']), api('switchAbonament'));
router.get('/cursurile-mele', authenticate, authorize(['client', 'instructor']), api('getMyCourses'));
router.get('/:idAbonament/cursuri', authenticate, authorize(['client', 'instructor']), api('getAvailableCourses'));

router.get('/', api('getAll'));
router.get('/:id', api('getById'));
router.delete('/:id', api('delete')); 
router.post('/', authenticate, authorize('admin'), api('create')); 
router.put('/:id', authenticate, authorize('admin'), api('update'));

module.exports = router;
