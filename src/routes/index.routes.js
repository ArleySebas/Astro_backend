const { Router } = require('express');

const router = Router();

const { renderHome, formularioFrontend } = require('../controllers/index.controllers.js');

// Formulario //
router.post('/formulario_contacto', formularioFrontend);


module.exports = router;
