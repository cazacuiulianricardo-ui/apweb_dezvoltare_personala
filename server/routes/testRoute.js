const express = require('express');
const router = express.Router();
const { makeInvoker } = require('awilix-express');

const api = makeInvoker(({ testController }) => ({
    testDurate: (req, res) => testController.testDurate(req, res),
}));

router.get('/test-durate', api('testDurate'));


module.exports = router;
