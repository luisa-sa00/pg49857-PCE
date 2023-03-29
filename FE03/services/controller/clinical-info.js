let ClinicalInfoSchema = require('../model/clinical-info');

module.exports.newSensor = async (id, admdate, bed, bodytemp, systolic, diastolic, bpm, stato2, timestamp) => {
    try {
        let blood_pressure_object = new BloodPressureSchema ({ systolic: systolic, diastolic: diastolic })
        let clinical_info = new ClinicalInfoSchema ({ 
            clinicalInfoID: id, 
            admDate: admdate, 
            bed: bed, 
            bodyTemp: bodytemp, 
            bloodPres: blood_pressure_object, 
            bpm: bpm, 
            stato2: stato2, 
            timestamp: timestamp });
        let response = await clinical_info.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}