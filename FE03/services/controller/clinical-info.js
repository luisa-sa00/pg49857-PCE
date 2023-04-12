let ClinicalInfoSchema = require('../model/clinical-info');

module.exports.newClinicalInfo = async (admdate, bed, bodytemp, systolic, diastolic, bpm, stato2, timestamp) => {
    try {
        // let blood_pressure_object = new BloodPressSchema ({ systolic: systolic, diastolic: diastolic })
        let clinical_info = new ClinicalInfoSchema ({ 
            admDate: admdate, 
            bed: bed, 
            bodyTemp: bodytemp, 
            bloodPress: {
                systolic: systolic,
                diastolic: diastolic
              }, 
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