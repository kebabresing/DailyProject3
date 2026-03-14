const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

router.get('/', alumniController.getLaporan);
router.get('/data', alumniController.index);
router.get('/add', alumniController.formAdd);
router.post('/add', alumniController.add);
router.get('/edit/:id', alumniController.formEdit);
router.post('/edit/:id', alumniController.edit);
router.get('/delete/:id', alumniController.delete);
router.get('/simulate', alumniController.simulateBot);

module.exports = router;
