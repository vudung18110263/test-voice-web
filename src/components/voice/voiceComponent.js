import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { LanguageCodeEnum, LanguageEmun } from '@/types';
import WebSpeechAPI from './WebSpeechAPI';
import { getDataText } from '@/utils';
import { CoiveContext } from '@/hooks/voiceContext';

export default function VoiceComponent(props) {
    const { language = LanguageEmun.ENGLISH } = props;
    const langCode = LanguageCodeEnum[`${language}`];
    const { setIsSpeaking } = React.useContext(CoiveContext);

    const textList = getDataText(langCode);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const message1 = new SpeechSynthesisUtterance(textList.agreement);
            const message2 = new SpeechSynthesisUtterance(textList.question);
            message1.lang = langCode; // Ngôn ngữ cung cấp, ví dụ: tiếng Anh (Mỹ)
            message2.lang = langCode;

            const speechSynthesis = window.speechSynthesis;
            speechSynthesis.cancel();

            setIsSpeaking(true);

            speechSynthesis.speak(message1);
            message1.onend = () => {
                speechSynthesis.speak(message2);
              };

            message2.addEventListener('end', () => {
                setIsSpeaking(false);
            });
        } else {
            console.error('Web Speech API is not supported in this browser.');
        }
    };

    useEffect(()=>{
        setTimeout(()=>{
            // handleSpeak();
        }, 0)
    },[])

    return (
        <Container maxWidth="sm" className="justify-content-center pt-4" >
            <Grid container spacing={4} className='box-container'>
                <Grid item xs={12} className='d-flex justify-content-center '>
                    <h1>Consent Form</h1>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='typographyStyle' variant="subtitle1" gutterBottom>
                        {textList.agreement}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='typographyStyle' variant="subtitle1" gutterBottom>
                        {textList.question}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <WebSpeechAPI langCode={langCode}/>
                </Grid>
                {/* <Button onClick={handleSpeak}>click</Button> */}
            </Grid>
        </Container>
    );
}
