import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect, useState } from "react";
import { responsiveFontSizes } from '@mui/material';

export default function ListSensors () {
    const baseURL = "http://localhost:3000/sensors/list";

    // definir objeto a trabalhar (sensorList) e modo interno de o alterar (setSensorList)
    const [sensorList, setSensorList] = useState([]);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setSensorList(response.data);
        })
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}