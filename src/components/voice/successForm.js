import { Container, Grid, IconButton, Typography } from "@mui/material";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Link from "next/link";
import React from "react";
import { CoiveContext } from "@/hooks/voiceContext";
import { useRouter } from "next/router";

export default function SuccessForm() {
    const { resetData } = React.useContext(CoiveContext);
    const router = useRouter();
    const handleRedirect = () => {
        resetData && resetData()
        router.push('/consent');
    }
    
    return <Container maxWidth="xs" className="justify-content-center pt-4">
        <Grid container spacing={4} className='box-container'>
            <Grid item xs={12} className='d-flex justify-content-center '>
                <h1>Consent Form</h1>
            </Grid>
            <Grid item xs={12} className='d-flex justify-content-center '>
                <IconButton size="large" style={{ backgroundColor: '#cccc', padding: 20 }} >
                    <FactCheckIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12} className='d-flex justify-content-center flex-column align-items-center'>
                <Typography className='typographyStyle pb-2 ' variant="subtitle1">Thank you, your consent has been</Typography>
                <Typography className='typographyStyle pb-2 ' variant="subtitle1">SuccessFully saved!</Typography>
            </Grid>
            <Grid item xs={12} className='d-flex justify-content-center flex-column align-items-center'>
                <a className="tagAButton" onClick={handleRedirect}>View all consents</a>
            </Grid>
        </Grid>
    </Container>
}