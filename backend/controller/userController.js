const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express')
const User = require('../models/userModel')


// Registrar un usuario Nuevo
const registrarUser = asyncHandler(async (req, res) => {

    const {name, email, password } = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos favor de verificar')
    }

    //Verificamos si el User existe
    const userExist = await User.findOne({ email})
    if(userExist) {
        res.status(400)
        throw new Error ('Ese usuario ya existe en la base de datos')

    } else {
        //hash password
    }



    res.status(201).json({
        message: "Usuario Registrado"
    })
})

//Hacer Login
const loginUser = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: "Login Usuario"
    })
})

//Mostrar los datos del usuario
const datosUser = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: "Mis datos de usuarios"
    })
})

module.exports = {
    registrarUser,
    datosUser,
    loginUser
}