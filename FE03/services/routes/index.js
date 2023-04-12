var express = require("express");
var router = express.Router();
var SensorController = require("../controller/sensor.js");
var ServiceController = require("../controller/service");
var PatientController = require("../controller/patient");
var CaretakerController = require("../controller/caretaker");
var ClinicalInfoController = require("../controller/clinical-info");
var axios = require("axios");

router.get("/", (req, res) => {
  res.json({
    rota: "index",
  });
});

/*
router.get('/acedehpeixoto/:id', function(req, res) {
  axios.get(
      'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
  )
  .then(async response => {
    const {sensorid, sensornum, type_of_sensor} = response.data;
    
    // resposta ao pedido GET para adicionar sensor à base de dados
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (newSensorResponse.success) {
      res.status(200).json({info: "Novo sensor adicionado com sucesso!"})
    } else {
      res.status(200).json({info: "Erro ao adicionar novo sensor!"})
    }

    // resposta ao pedido GET para adicionar paciente à base de dados
    // resposta ao pedido GET para adicionar serviço
    // resposta ao pedido GET para adicionar clinical info
    // resposta ao pedido GET para adicionar care taker

  })
  .catch(err => {
    console.log(err);  
    res.json(err);
  })
});*/


router.get("/acedehpeixoto/:id", (req, res) => {
    axios.get("http://nosql.hpeixoto.me/api/sensor/" + req.params.id)
    .then(async response => {
      const { sensorid, sensornum, type_of_sensor } = response.data;
      let newSensorResponse = await SensorController.newSensor(
        sensorid,
        sensornum,
        type_of_sensor
      );
      if (!newSensorResponse.success) throw "Erro na criação do sensor";

      //SERVICE----------------------------------------------------
      const { servicecod, servicedesc } = response.data;
      let newServiceResponse = await ServiceController.newService(
        servicecod,
        servicedesc
      );
      if (!newServiceResponse.success) throw "Erro na criação do serviço";

      //PATIENT----------------------------------------------------
      const { patient } = response.data;
      let newPatientResponse = await PatientController.newPatient(
        patient.patientid,
        patient.patientname,
        patient.patientbirthdate,
        patient.patientage
      );
      if (!newPatientResponse.success) throw "Erro na criação do paciente";

      //CARETEAM----------------------------------------------------
      const { careteam } = response.data;
      for (let i = 0; i < careteam.length; i++) {
        var newCaretakerResponse = await CaretakerController.newCaretaker(
          careteam[i].id,
          careteam[i].nome
        );
      }

      //CLINICAL-INFO----------------------------------------------------
      const { admdate, bed, bodytemp, bloodpress, bpm, sato2, timestamp } =
        response.data;
      let newClinicalInfoResponse =
         await ClinicalInfoController.newClinicalInfo(
           admdate,
           bed,
           bodytemp,
           bloodpress.systolic,
           bloodpress.diastolic,
           bpm,
           sato2,
           timestamp
         );

      if (
        newSensorResponse.success &&
        newServiceResponse.success &&
        newPatientResponse.success &&
        newCaretakerResponse.success &&
        newClinicalInfoResponse.success
      ) {
        res.status(200).json({ info: "Adicionado com sucesso" });
      } else {
        res.status(200).json({ info: "Erro ao adicionar novo" });
      }
    })
    .catch((err) => {
      console.log("ERRO: " + err);
      res.json(err);
    });
}); 

module.exports = router;
