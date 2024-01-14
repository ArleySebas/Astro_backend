const Formulario = require('../models/Formulario');
const {
    enviarMail
} = require('../helpers/Enviar-emails');

const indexCtrl = {};
const usuarios = {};

indexCtrl.formularioFrontend = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        const newFormulario = new Formulario({
            name, phone, email, message
        })
        await newFormulario.save();



        const date = new Date();

        const options = { timeZone: 'America/Bogota', 'hour12': false };
        const fechaActual = date.toLocaleString('es-CO', options).split(',')[0];
        const horaActual = date.toLocaleString('es-CO', options).split(',')[1];
        const fechaYhora = `${horaActual} ${fechaActual}`;

        const subject = `Perfil, Hora: ${horaActual} y fecha ${fechaActual}`;
        const text = `La persona: ${newFormulario.name}; con teléfono: ${newFormulario.phone}; y correo: ${newFormulario.email}; envía el siguiente mensaje:

        ----

        ${newFormulario.message}
        
        ----`;

        console.log('formulario',newFormulario);
        await enviarMail(subject, text);

        res.json({
            name: newFormulario.name,
            email: newFormulario.email,
            phone: newFormulario.phone,
            message: newFormulario.message
        });
    }  catch (error) {
        res.status(500).json({
            error: 'Error al guardar y enviar el correo'
        })
    }
}

module.exports = indexCtrl;