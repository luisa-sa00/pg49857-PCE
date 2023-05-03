const fs = require('fs');
const { newPaciente } = require('./paciente');
// const { newCodigoPostal} = require('./cod_postal');
// const { newRegisto } = require('./registo');


module.exports.readFile = async () => {
    const filePath = "C:\\Users\\ASUS\\Documents\\Mestrado\\1º Ano\\2º Semestre\\PCE - Processo Clínico Eletrónico\\Aplicações\\pg49857-PCE\\registosCovid\\localfiles\\";
    const filenames = ['doentes.csv', 'registos_covid19.csv'];

    let doentes = [];
    let registos = [];

    function normalizaTemp(temp){
        return parseFloat(temp.split(" ")[0]);
    }

    function normalizaVazios(valor){
        return (valor === '' || !valor) ? 0 : valor;
    }

    // leitura ficheiro doentes.csv
    const fileRead = fs.readFileSync(filePath + filenames[0]);
    let lines = fileRead.toString().split("\n");

    for (let line of lines) {
        let lineParams = line.split(";");
        if (lineParams[lineParams.length - 1].includes("\r"))
            lineParams[lineParams.length - 1] = lineParams[
            lineParams.length - 1
            ].slice(0, -1);

        let newDoente = {
            id_paciente: lineParams[3],
            nome: lineParams[4],
            data_nascimento: lineParams[1],
            genero: lineParams[2],
            cod_postal: lineParams[0],
            registos: [],
        };
        doentes.push(newDoente);
    }

    // leitura ficheiro registos_covid19.csv
    const fileRead2 = fs.readFileSync(filePath + filenames[1]);
    let lines2 = fileRead2.toString().split("\n");

    for (let line of lines2) {
        let lineParams = line.split(";");
        if (lineParams[lineParams.length - 1].includes("\r"))
            lineParams[lineParams.length - 1] = lineParams[
            lineParams.length - 1
            ].slice(0, -1);
        
        let newRegisto = {
            num_seq: normalizaVazios(lineParams[0]),
            data_registo: normalizaVazios(lineParams[1]),
            temperatura: normalizaVazios(normalizaTemp(lineParams[2])),
            falta_ar: normalizaVazios(lineParams[3]),
            dor_cabeca: normalizaVazios(lineParams[4]),
            dor_muscular: normalizaVazios(lineParams[5]),
            tosse: normalizaVazios(lineParams[6]),
            diarreia: normalizaVazios(lineParams[7]),
            olfato_paladar: normalizaVazios(lineParams[8]),
            avaliacao_global: normalizaVazios(lineParams[9]),
        };
        registos.push(newRegisto);
    }

    // merge das listas criadas, para juntar os registos do paciente aos seus restantes dados
    doentes.map(x => {
        x.registos = registos.filter(y => y.num_seq == x.id_paciente)
        return x;
    })

    for (let doente of doentes){
        newPaciente(doente.id_paciente, doente.nome, doente.data_nascimento, doente.genero, doente.cod_postal, doente.registos)
    }
}