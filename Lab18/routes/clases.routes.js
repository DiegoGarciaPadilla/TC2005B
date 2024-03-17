const express = require('express');
const router = express.Router();

const cultivosController = require('../controllers/cultivos.controller');

router.get('/crear', cultivosController.get_crear);
router.post('/crear', cultivosController.post_crear);
router.get('/:id', cultivosController.get_root);
router.get('/', cultivosController.get_root);

module.exports = router;