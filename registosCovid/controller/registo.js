let RegistoSchema = require('../model/registo.js');

module.exports.newRegisto = async (num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global) => {
    try {
        let registo = new RegistoSchema({ num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global });
        let response = await registo.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}