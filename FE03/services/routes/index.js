var express = require('express');
var router = express.Router();
var axios = require('axios');

let SensorController = require('../controller/sensor.js')
let PatientController = require('../controller/patient.js')
let ServiceController = require('../controller/service.js')
let ClinicalInfoController = require('../controller/clinical-info.js')
let CareTakerController = require('../controller/caretaker.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    rota: 'index'
  });
});


router.get('/acedeHPeixoto/:id', function(req, res) {
  axios.get(
      'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
  )
  .then(async response => {
    const {sensorid, sensornum, type_of_sensor, patient, servicecod, servicedesc, admdate, bed, bodytemp, bloodpress, bpm, sato2, timestamp} = response.data;

    // resposta ao pedido GET para adicionar sensor à base de dados
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (newSensorResponse.success) {
      res.status(200).json({info: "Novo sensor adicionado com sucesso!"})
    } else {
      res.status(200).json({info: "Erro ao adicionar novo sensor!"})
    }

    // resposta ao pedido GET para adicionar paciente à base de dados
    let newPatientResponse = await PatientController.newPatient(patient.patientid, patient.patientname, patient.patientbirthdate, patient.patientage);
    if (newPatientResponse.success) {
      res.status(200).json({info: "Novo paciente adicionado com sucesso!"})
    } else {
      res.status(200).json({info: "Erro ao adicionar novo paciente!"})
    }

    // resposta ao pedido GET para adicionar serviço
    let newServiceResponse = await ServiceController.newService(servicecod, servicedesc);
    if (newServiceResponse.success) {
      res.status(200).json({info: "Novo serviço adicionado com sucesso!"})
    } else {
      res.status(200).json({info: "Erro ao adicionar novo serviço!"})
    }

    // resposta ao pedido GET para adicionar clinical info
    let newClinicalInfoResponse = await ClinicalInfoController.newClinicalInfo(admdate, bed, bodytemp, bloodpress.systolic, bloodpress.diastolic, bpm, sato2, timestamp);
    if (newClinicalInfoResponse.success) {
      res.status(200).json({info: "Nova informação clínica adicionada com sucesso!"})
    } else {
      res.status(200).json({info: "Erro ao adicionar nova informação clínica!"})
    }

    // resposta ao pedido GET para adicionar care taker

  })
  .catch(err => {
    console.log(err);  
    res.json(err);
  })
});


module.exports = router;
