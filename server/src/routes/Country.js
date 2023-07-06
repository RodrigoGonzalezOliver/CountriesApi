const { Router } = require("express");
const { getAllCountries, getCountryById, getCountryByName } = require("../controllers/countrycontrollers");
const router = Router();


//Ruta general de todos los paises o por Query
router.get("/countries", getAllCountries);

//Ruta a cada Pais segun ID
router.get("/countries/:idPais", getCountryById);

//Ruta por name
router.get('/countries/name/:name', getCountryByName);


module.exports = router;