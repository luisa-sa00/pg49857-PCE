let PacienteSchema = require('../model/paciente');

module.exports.newPaciente = async (id_paciente, nome, data_nascimento, genero, cod_postal, registos) => {
    try {
        let patient = new PacienteSchema ({ id_paciente, nome, data_nascimento, genero, cod_postal, registos});
        let response = await patient.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}