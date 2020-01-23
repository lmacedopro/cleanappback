const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    checkEmail:{
        type: Boolean,
        required: true,
        default: false,
    },
    phone: {
        type: String,
    },
    checkPhone: {
        type: Boolean,
        required: true,
        default: false,

    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    profile:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});


//Usa bcrypt para enciptar a senha do usuário antes de salvar no banco
UserSchema.pre('save', async function(next){

    const hash = await bcrypt.hash( this.password, 10 );
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;