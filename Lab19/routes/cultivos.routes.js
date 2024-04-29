const express = require('express');
const router = express.Router();

const { get_crear, post_crear, get_root } = require('../controllers/cultivos.controller');

const { consulta_cultivo, crea_cultivo } = require('../util/privilegios');

const isAuth = require('../util/is-auth');

router.get('/crear', isAuth, crea_cultivo, get_crear);
router.post('/crear', isAuth, crea_cultivo, post_crear);
router.get('/:id', isAuth, consulta_cultivo, get_root);
router.get('/', isAuth, consulta_cultivo, get_root);

module.exports = router;