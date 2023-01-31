const { Router } = require('express');
const countriesRoutes = require('./countriesRoutes');
const touristActivitiesRoutes = require('./activitiesRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/countries', countriesRoutes);
router.use('/touristActivities', touristActivitiesRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
