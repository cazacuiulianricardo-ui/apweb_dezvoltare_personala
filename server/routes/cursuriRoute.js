const express = require('express');
const router = express.Router();
const { makeInvoker } = require('awilix-express');
const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');


const api = makeInvoker(({ cursController }) => ({
    getAll: (req, res) => cursController.getAll(req, res),
    getById: (req, res) => cursController.getById(req, res),
    create: (req, res) => cursController.create(req, res),
    update: (req, res) => cursController.update(req, res),
    delete: (req, res) => cursController.delete(req, res),
    getMyCreatedCourses: (req, res) => cursController.getMyCreatedCourses(req, res),
    createCourse: (req, res) => cursController.createCourse(req, res)
}));


router.get('/mele-create', authenticate, authorize('instructor'), api('getMyCreatedCourses'));
router.post('/create', authenticate, authorize('instructor'), api('createCourse'));


router.get('/', api('getAll'));
router.get('/:id', api('getById'));
router.put('/:id', authenticate, authorize(), api('update'));
router.delete('/:id', authenticate, authorize(), api('delete'));

module.exports = router;
