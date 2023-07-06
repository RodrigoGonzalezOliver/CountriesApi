const { Router } = require('express');

const country = require("./Country.js");
const activities = require("./Activities.js");


const router = Router();

router.use('/', country);
router.use('/', activities);

module.exports = router;

