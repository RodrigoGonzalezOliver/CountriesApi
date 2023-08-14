const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");

//trae los paises de la API
const getApiInfo = async () => {
	// Hacemos una peticion a la API
	
	const response = await axios.get("http://localhost:5000/countries");

	const map = response.data.map((e) => {
		// Mapeamos la respuesta de la API a un objeto que represente cada pais
		const country = {
			id: e.cca3,
			name: e.name.common,
			flag: e.flags.png,
			continent: e.continents[0],
			capital: e.capital != null ? e.capital[0] : "No data",
			subregion: e.subregion,
			area: e.area,
			poblation: e.population,
		};
		return country;
	});
	// Retornamos el array de paises
	return map;
};

/*const getApiInfo = async (req, res) => {
	// Hacemos una peticion a la API
	try{
	const response = await axios.get("http://localhost:5000/countries");

	const country = response.data.map((e) => {
		// Mapeamos la respuesta de la API a un objeto que represente cada pais
		return {
			id: e.cca3,
			name: e.name.common,
			flag: e.flags.png,
			continent: e.continents[0],
			capital: e.capital != null ? e.capital[0] : "No data",
			subregion: e.subregion,
			area: e.area,
			poblation: e.population,
		};
		//return country;
	});
	res.json(country)
	// Retornamos el array de paises
	//res.status(200).json(map)
}catch (error) {
		console.log(error)
	}
};*/


// Funcion asincronica que carga los paises en la base de datos
const countriesToDb = async () => {
	try {
		// Buscamos si ya existen paises en la base de datos
		const countries = await Country.findAll();
		// Si no hay paises en la base de datos, cargamos los datos de la API en la base de datos
		if (!countries.length) {
			const array = await getApiInfo();
			await Country.bulkCreate(array);// bulkCreate es una herramienta para insertar rápidamente múltiples registros en una base de datos a través de una sola consulta
		}
	} catch (error) {
		console.log(error)
	}
};
// Controlador de la ruta GET /countries
const getAllCountries = async (req, res) => {
	// Cargamos los paises en la base de datos antes de hacer la consulta
	await countriesToDb();

	// Obtenemos el parámetro name de la consulta
	const name = req.query.name;
	
	try {
		if (!name) {
		// Si no se especifica el nombre de un país, obtenemos todos los países de la base de datos
			const countries = await Country.findAll({
				include: [
					{
						model: Activity,
						attributes: ["name", "difficulty", "duration", "season"],
						through: { attributes: [] },
					},
				],
			});

			// Si encontramos países, los enviamos como respuesta
			if (countries) {
				res.status(200).json(countries);
			} else {
				res.status(404).send("No se encontró paises");
			}
		} else {
			// Si se especifica el nombre de un país, buscamos todos los países que coincidan con el nombre
			const country = await Country.findAll({
				where: {
					name: { [Op.substring]: name },
				},
				include: [
					{
						model: Activity,

						through: { attributes: [] },
					},
				],
			});
			// Si encontramos el país, lo enviamos como respuesta
			if (country) {
				res.status(200).json(country);
			} else {
				res.status(404).send("País no encontrado");
			}
		}
	} catch (error) {
		console.log(error);
	}
};

// Controlador de la ruta GET /countries/:idPais
const getCountryById = async (req, res) => {
    const idPais = req.params.idPais;

    try {
        const country = await Country.findOne({
            where: {
                id: idPais.toUpperCase(),
            },
            include: [ 	// Incluye información de la relación con la tabla "Activity"
                {
                    model: Activity,
                    attributes: ["name", "difficulty", "duration", "season"],
                    through: { attributes: [] },	
                },
            ],
        });
        if (country) {
             res.status(200).json(country);
        } else {
             res.status(404).send("País no encontrado");
        }
    } catch (error) {
        console.log(error);
    }
};


const getCountryByName = async (req, res) => {
	const { name } = req.params;
	const countries = await Country.findAll({
	  where: {
		name: {
		  [Op.like]: name,
		},
	  },
	});
  
	if (countries.length > 0) {
	   res.status(200).json(countries);
	} else {
	   res.status(404).send("País no encontrado");
	}
  };



module.exports = {
    getAllCountries,
    getCountryById,
	getCountryByName}