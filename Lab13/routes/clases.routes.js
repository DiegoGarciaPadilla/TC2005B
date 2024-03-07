const express = require('express');
const router = express.Router();

const tropasController = require('../controllers/cultivos.controller');

router.get('/crear', tropasController.get_crear);
router.post('/crear', tropasController.post_crear);
router.get('/', tropasController.get_root);

module.exports = router;