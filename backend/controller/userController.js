const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
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
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //Crear usuario
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword

        })
        //Checar si se pudo crear el usuario
        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                admin: user.esAdmin
            })
        } else {
            res.status(400)
            throw new Error("No se pudo guardar el usuario")
        }
        
    }

})

//Hacer Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Faltan datos favor de verificar')
    }

    //verificar si el usuario existe
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.esAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ("Credenciales incorrectas, favor de verificar")    
    }

})

//Mostrar los datos del usuario
const datosUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generamos el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'

    })
}

module.exports = {
    registrarUser,
    datosUser,
    loginUser
}