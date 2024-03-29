var express = require("express");
var router = express.Router();
var axios = require("axios");
var SensorModel = require("../model/sensor.js");
var SensorController = require("../controller/sensor.js");

// router.get("/", (req, res) => {
//   res.json({
//     rota: "sensores",
//   });
// });

// router.get("/identificador/:id", (req, res) => {
//   res.json({
//     identificador: req.params.id,
//   });
// });


router.get("/list", async (req, res) => {
  const sensorResponse = await SensorController.listSensors();
  res.status(200).json(sensorResponse.response)
});

router.get("/list/:id", async (req, res) => {
  const sensorResponse = await SensorController.listSensor(req.params.id);
  res.status(200).json(sensorResponse.response);
});

router.get("/delete/:id", async (req, res) => {
  const sensorResponse = await SensorController.deleteSensor(req.params.id);
  res.status(200).json(sensorResponse.response);
});



router.post("/update/:id", async (req, res) => {
  console.log(req);
  const sensorResponse = await SensorController.updateSensor(req);
  res.status(200).json(sensorResponse.response);
});

router.post("/new", async (req, res) => {
  let { id, num, type } = req.body;
  const sensorResponse = await SensorController.newSensor(id, num, type);
  console.log(sensorResponse.success);
  if (!sensorResponse.success) {
   return res.status(400).json({ response: sensorResponse.response});
  }
  else { 
   return res.status(200).json({ response: sensorResponse.response});
  }
})

module.exports = router;
