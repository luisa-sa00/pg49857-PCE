var express = require("express");
var router = express.Router();
var axios = require("axios");
var RegistoModel = require("../model/registo.js");
var RegistoController = require("../controller/registo.js");

router.post("/new", async (req, res) => {
    let { num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global } = req.body;
    const registoResponse = await RegistoController.newCodigoPostal(num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global);
    console.log(registoResponse.success);
    if (!registoResponse.success) {
     return res.status(400).json({ response: registoResponse.response});
    }
    else { 
     return res.status(200).json({ response: registoResponse.response});
    }
  })