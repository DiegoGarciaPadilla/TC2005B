const express = require('express');
const router = express.Router();

const cultivosController = require('../controllers/cultivos.controller');
const isAuth = require('../util/is-auth');

router.get('/crear', isAuth, cultivosController.get_crear);
router.post('/crear', isAuth, cultivosController.post_crear);
router.get('/:id', isAuth, cultivosController.get_root);
router.get('/', isAuth, cultivosController.get_root);

module.exports = router;