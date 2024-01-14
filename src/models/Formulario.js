const {Schema, model} = require('mongoose');

const formularioSchema = new Schema({
    name: {type: String, required: false, maxlength: 50, default: 0},
    email: {type:String, required: false, maxlength: 150, default: 0},
    phone: {type: Number, required: false, maxlength: 15,default: 0},
    message: {type: String, required: false, maxlength: 200, default: 0},
}, {
    timestamps: true,
});


module.exports = model('Formulario', formularioSchema);