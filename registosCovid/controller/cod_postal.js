let CodigoPostalSchema = require('../model/codigo_postal');

module.exports.newCodigoPostal = async (cod_postal, localidade) => {
    try {
        let codigo_postal = new CodigoPostalSchema ({ cod_postal, localidade });
        let response = await codigo_postal.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}