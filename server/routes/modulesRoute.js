const express = require('express');
const router = express.Router();
const { makeInvoker } = require('awilix-express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const multer = require('multer');

const storageVideos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const storagePDFs = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pdfs/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadVideo = multer({ storage: storageVideos });
const uploadPDF = multer({ storage: storagePDFs });

const api = makeInvoker(({ moduleController, resourceController }) => ({
    getModulesByCursId: (req, res) => moduleController.getModulesByCursId(req, res),
    getModuleById: (req, res) => moduleController.getModuleById(req, res),
    createModule: (req, res) => moduleController.createModule(req, res),
    updateModule: (req, res) => moduleController.updateModule(req, res),
    deleteModule: (req, res) => moduleController.deleteModule(req, res),
    addVideo: (req, res) => resourceController.addVideo(req, res),
    updateVideo: (req, res) => resourceController.updateVideo(req, res),
    deleteVideo: (req, res) => resourceController.deleteVideo(req, res),
    addPDF: (req, res) => resourceController.addPDF(req, res),
    updatePDF: (req, res) => resourceController.updatePDF(req, res),
    deletePDF: (req, res) => resourceController.deletePDF(req, res),
}));

// Rute  module
router.get('/cursuri/:cursId/modules', authenticate, authorize(['admin', 'instructor']), api('getModulesByCursId'));
router.get('/modules/:id', authenticate, authorize(['admin', 'instructor']), api('getModuleById'));
router.post('/cursuri/:cursId/modules', authenticate, authorize(['admin', 'instructor']), api('createModule'));
router.put('/modules/:id', authenticate, authorize(['admin', 'instructor']), api('updateModule'));
router.delete('/modules/:id', authenticate, authorize(['admin', 'instructor']), api('deleteModule'));

// Rute videoclipuri/pdf-uri
router.post('/modules/:moduleId/videos', authenticate, authorize(['admin', 'instructor']), uploadVideo.single('file'), api('addVideo'));
router.put('/videos/:videoId', authenticate, authorize(['admin', 'instructor']), api('updateVideo'));
router.delete('/videos/:videoId', authenticate, authorize(['admin', 'instructor']), api('deleteVideo'));

router.post('/modules/:moduleId/pdfs', authenticate, authorize(['admin', 'instructor']), uploadPDF.single('file'), api('addPDF'));
router.put('/pdfs/:pdfId', authenticate, authorize(['admin', 'instructor']), api('updatePDF'));
router.delete('/pdfs/:pdfId', authenticate, authorize(['admin', 'instructor']), api('deletePDF'));

module.exports = router;
