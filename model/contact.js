const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    date: { type: Date, default: () => Date.now() },
})

const Contact = model('contact', contactSchema);
module.exports = Contact;