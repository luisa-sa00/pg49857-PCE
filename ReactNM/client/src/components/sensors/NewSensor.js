import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function NewSensor() {
  const [type, setType] = React.useState('');
  const [id, setID] = React.useState('');
  const [num, setNum] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    setID(event.target.value);
    setNum(event.target.value)
  };

  return (
    <div>
        <p><b>Adicionar novo Sensor</b></p>
        <TextField id="outlined-basic" value={id} onChange={handleChange} label="ID" variant="outlined" />
        <TextField id="outlined-basic" value={num} onChange={handleChange} label="Número" variant="outlined" />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={type}
            onChange={handleChange}
            label="Type"
            >
            {/* <MenuItem value="">
                <em>None</em>
            </MenuItem> */}
            <MenuItem value={"cardiac"}>Cardíaco</MenuItem>
            <MenuItem value={"blood"}>Pressão sanguínea</MenuItem>
            </Select>
        </FormControl>

        <Button variant="contained">Adicionar</Button>
        {/* ao clicar no botão, enviar pedido POST para o node (onde temos de criar uma rota para adicionar sensor (routes/sensor)!)
        router.post(/new...)

        acrescentar também validações dos campos, só pode haver submissão pelo botão quando os campos estão preenchidos
        */}
        <p></p>
    </div>
    )
}