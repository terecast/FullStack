const express = require('express')
const router = express.Router()
const {getTarea, crearTarea, modificarTarea, deleteTarea} = require('../controller/tareasController')

//Opciones mas simple
//router.route('/').get(getTarea).post(crearTarea)
//router.route('/').put(modificarTarea).delete(eliminarTarea)

//OBTENER TAREAS
router.get('/', getTarea)
    
//CREAR TAREAS
router.post('/', crearTarea)
   
//MODIFICAR TAREAS
router.put('/:id', modificarTarea) 
  
//ELIMINAR TAREAS
router.delete('/:id', deleteTarea) 

//LOGIN


module.exports = router