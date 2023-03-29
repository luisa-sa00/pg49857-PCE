var express = require('express');
var router = express.Router();
var axios = require('axios');

let SensorController = require('../controller/sensor.js')

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
});


module.exports = router;
