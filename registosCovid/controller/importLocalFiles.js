const fs = require('fs');
const { newPaciente } = require('./paciente');
const { newCodigoPostal} = require('./cod_postal');
const { newRegisto } = require('./registo');


module.exports.readFile = async () => {
    const filePath = "C:\\Users\\maria\\Desktop\\MIEBIOM\\4º Ano\\2º Semestre\\O Processo Clínico Eletrónico\\pce\\registosCovid\\localfiles\\";
    const filenames = ['doentes.csv'];

    for(let name of filenames) {
        const fileRead = fs.readFileSync(filePath + name);
        let lines = fileRead.toString().split('\n');
        for(let line of lines) {
            let lineParams = line.split(';');
            if(lineParams[lineParams.length-1].includes('\r'))
                lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1);

            let [id_paciente, nome, data_nascimento, genero, cod_postal] = [lineParams[3], lineParams[4], lineParams[1], lineParams[2], lineParams[0]];
            newPaciente(id_paciente, nome, data_nascimento, genero, cod_postal);

            //let [cod_postal, localidade] = [lineParams[0], lineParams[1]];
            //console.log(cod_postal, localidade)
            //newCodigoPostal(cod_postal, localidade);

            //let [num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global] = [lineParams[0], lineParams[1], parseFloat(lineParams[2]), lineParams[3], lineParams[4], lineParams[5], lineParams[6], lineParams[7], lineParams[8], lineParams[9]];
            //console.log(num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global)
            /* if(isNaN(temperatura)) {
                temperatura = ''
            }
            newRegisto(num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global)*/
        }
    }
}