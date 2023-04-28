var express = require("express");
var router = express.Router();
var axios = require("axios");
var CodigoPostalModel = require("../model/codigo_postal.js");
var CodigoPostalController = require("../controller/cod_postal.js");

router.post("/new", async (req, res) => {
    let { cod_postal, localidade } = req.body;
    const codigoPostalResponse = await CodigoPostalController.newCodigoPostal(cod_postal, localidade);
    console.log(codigoPostalResponse.success);
    if (!codigoPostalResponse.success) {
     return res.status(400).json({ response: codigoPostalResponse.response});
    }
    else { 
     return res.status(200).json({ response: codigoPostalResponse.response});
    }
  })