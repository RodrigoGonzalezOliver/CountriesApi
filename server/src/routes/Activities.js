const { Router } = require('express');

const { getActivities, postActivity} = require("../controllers/activitycontrollers");

const router = Router();

// Ruta para desplegar actividades
router.get('/activities', getActivities);

// Ruta para postear actividades
router.post('/activities', postActivity);

module.exports = router;