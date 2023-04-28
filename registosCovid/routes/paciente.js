var express = require("express");
var router = express.Router();
var axios = require("axios");
var PacienteModel = require("../model/paciente.js");
var PacienteController = require("../controller/paciente.js");

router.post("/new", async (req, res) => {
    let { id, nome, data, genero, cod_postal } = req.body;
    const pacienteResponse = await PacienteController.newPaciente(id, nome, data, genero, cod_postal);
    console.log(pacienteResponse.success);
    if (!pacienteResponse.success) {
     return res.status(400).json({ response: pacienteResponse.response});
    }
    else { 
     return res.status(200).json({ response: pacienteResponse.response});
    }
  })