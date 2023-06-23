import { LIST_INFO_KEY } from "@/utils/constants";
import { Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import ButtonPlayAudio from "../voice/ButtonPlayAudio";
import { base64ToBlob } from "@/utils";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LanguageEmun, LanguageText } from "@/types";

export const ListConsent = () => {

    const [localStorageData, setData] = useState([]);

    useEffect(() => {
        const dataInStorage = localStorage.getItem(LIST_INFO_KEY)
        const consents = JSON.parse(dataInStorage ? dataInStorage : `[]`);
        setData(consents);
    }, [])

    return (
        <Container maxWidth="xs" className="justify-content-center pt-4">
            <Grid container spacing={4} className='box-container'>
                <Grid item xs={12} className='d-flex justify-content-center '>
                    <h1>All Consents</h1>
                </Grid>
                <Grid item xs={12} className='d-flex justify-content-center'>
                    <div className="tableContainer">
                        <Table stickyHeader aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography className='typographyStyle' variant="h6">Details</Typography></TableCell>
                                    <TableCell align="right" colSpan={2}><Typography className='typographyStyle' variant="h6">Consent Given</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {localStorageData && localStorageData.length > 0 ? localStorageData.map((value, index) => {
                                    const blobData = base64ToBlob(value?.audioBlobBase64);
                                    return <TableRow key={`Consents-${index}`} style={{ backgroundColor: (index % 2 == 1) ? '#fff' : '#f2f2f2' }}>
                                        <TableCell>
                                            <div>
                                                <div>
                                                    <Typography variant="h6" gutterBottom>{value?.name}</Typography>
                                                </div>
                                                <div className='languageText'>
                                                    Language: {LanguageText[`${value?.language || LanguageEmun.ENGLISH}`]}
                                                </div>
                                            </div></TableCell>
                                        <TableCell align="right" >{value?.isAgree ? <CheckIcon style={{ color: '#666666' }} fontSize="large" /> : <CloseIcon style={{ color: '#666666' }} fontSize="large" />}</TableCell>
                                        <TableCell align="right" width={150}> <ButtonPlayAudio audioBlob={blobData} /></TableCell>
                                    </TableRow>
                                }) : <></>}
                            </TableBody>
                        </Table>
                    </div>

                </Grid>
            </Grid>
        </Container>)
}