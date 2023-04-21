import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";
import { useEffect, useState } from "react";
import EditSensor from "./EditSensor";
// import { responsiveFontSizes } from '@mui/material';

export default function ListSensors () {
    const baseURL = "http://localhost:3001/sensors/list";

    // definir objeto a trabalhar (sensorList) e modo interno de o alterar (setSensorList)
    const [sensorList, setSensorList] = useState([]);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setSensorList(response.data);
        })
    }, []);


    // const [isShown, setShowForm] = useState(false);

    // const handleClick = event => {
    //     setShowForm(current => !current);
    //     // ou
    //     // setShowForm(true);
    // }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div>
            <TableContainer component={Paper} style={{ width: 1200 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Identificador</TableCell>
                            <TableCell align="right">Número de Série</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sensorList.map((row) => (
                            <TableRow
                            key={row.sensorid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.sensorid}
                            </TableCell>
                            <TableCell align="right">{row.sensornum}</TableCell>
                            <TableCell align="right">{row.type_of_sensor}</TableCell>
                            {/* <Button align="right" onClick={handleClick}>Editar</Button> */}
                            
                            {/* ------------ver como passar parâmetros do sensor para o form de edição------------ */}
                            <Button align="right" variant="contained" onClick={handleOpen} message={[row.sensorid, row.sensornum, row.type_of_sensor]}>Editar</Button>
                            <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <EditSensor />
                                </Box>
                            </Modal>
                            {/* 
                            {isShown && (
                                <EditSensor />
                            )} */}
                            <Button align="right" variant="contained" color="error">Eliminar</Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}