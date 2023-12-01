const express = require('express')
const router = express.Router()
const {getTarea, crearTarea, modificarTarea, deleteTarea} = require('../controller/tareasController')
const { protect } = require('../middleware/authMiddleware')

//Opciones mas simple
//router.route('/').get(getTarea).post(crearTarea)
//router.route('/').put(modificarTarea).delete(eliminarTarea)

//OBTENER TAREAS
router.get('/', protect, getTarea)
    
//CREAR TAREAS
router.post('/', protect, crearTarea)
   
//MODIFICAR TAREAS
router.put('/:id', protect, modificarTarea) 
  
//ELIMINAR TAREAS
router.delete('/:id', protect, deleteTarea) 

//LOGIN


module.exports = router