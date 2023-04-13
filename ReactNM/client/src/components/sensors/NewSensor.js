import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";


export default function NewSensor() {

  const [type, setType] = React.useState('');
  const [id, setID] = React.useState('');
  const [num, setNum] = React.useState('');

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/sensors/new", //ligação à porta do NodeJS e ao respetivo caminho correspondente à acção de post de um novo sensor
        JSON.stringify({ id, num, type }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("Sensor adicionado com sucesso!")
      }
    } catch (error) {
      console.error(error.response.status);
      if ( error.response.status === 400 ){
        alert("Sensor não adicionado! Algo correu mal")}
      }
  }
  
  const formRef = React.useRef();
  return (
    <div>
        <p><b>Adicionar novo Sensor</b></p>
        <form ref={formRef}>
          <TextField required type="number" id="outlined-basic" label="ID" variant="outlined" value={id} onChange={(e) => setID(e.target.value)}/>
          <TextField required type="number" id="outlined-basic" label="Número" variant="outlined" value={num} onChange={(e) => setNum(e.target.value)}/>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
                >
                <MenuItem value={"cardiac"}>Cardíaco</MenuItem>
                <MenuItem value={"blood"}>Pressão sanguínea</MenuItem>
              </Select>
          </FormControl>

          <Button variant="contained" 
            onClick={(e) => {
              e.preventDefault();
              const form = formRef.current;
              if (form.checkValidity()) {
                handleAdd(e);
              } else {
                form.reportValidity();
              }
            }}
          >
            Adicionar
          </Button>
        </form>
        <p></p>
    </div>
    )

}