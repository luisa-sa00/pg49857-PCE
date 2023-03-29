let PatientSchema = require('../model/patient');

module.exports.newSensor = async (patientid, patientname, patientbirthdate, patientage) => {
    try {
        let patient = new PatientSchema ({ patientID: patientid, patientName: patientname, patientBirthdate: patientbirthdate, patientAge: patientage });
        let response = await patient.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}