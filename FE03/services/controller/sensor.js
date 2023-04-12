let SensorModel = require('../model/sensor');

module.exports.newSensor = async (sensorid, sensornum, type) => {
    try {
        let sensor = new SensorModel ({ sensorid: sensorid, sensornum: sensornum, type_of_sensor: type });
        let response = await sensor.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}

module.exports.deleteSensor = async (sensorid) => {
  try {
    const sensor = await SensorModel.findOneAndDelete({ sensorid });
    if (!sensor) {
      console.log(sensor);
      const error = new Error("Sensor não existe.");
      return { success: false, response: error.message };
    }
    return { success: true, response: sensor };
  } catch (error) {
    console.log(error);
    return { success: false, response: error };
  }
};

module.exports.listSensors = async () => {
  try {
    let sensor = await SensorModel.find({});
    console.log(sensor)
    return {success: true, response: sensor};
  } catch (err) {
      console.log(err);
      return {success: false, response: err};
  }
};

module.exports.listSensor = async (sensorid) => {
  try {
    let sensor = await SensorModel.findOne({sensorid});
    console.log(sensor)
    return {success: true, response: sensor};
  } catch (err) {
      console.log(err);
      return {success: false, response: err};
  }
}

module.exports.updateSensor = async (req) => {
  try {
    const { sensorid, newInfo } = req.body;
    console.log(sensorid, newInfo)
    const sensor = await SensorModel.findOneAndUpdate(
      { sensorid },
      { $set: { sensornum: newInfo.sensornum, type_of_sensor: newInfo.type_of_sensor } },
      { new: true}
    );
    if (!sensor) {
      throw new Error("Sensor não existe.");
    }
    return { success: true, response: sensor };
  } catch (error) {
    console.log(error);
    return { success: false, response: error };
  }
};
