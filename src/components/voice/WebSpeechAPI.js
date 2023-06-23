import { CoiveContext } from '@/hooks/voiceContext';
import React, { useState, useEffect, useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, IconButton, Typography } from '@mui/material';
import { LanguageCodeEnum } from '@/types';
import ButtonPlayAudio from './ButtonPlayAudio';

const SpeechRecognitionComponent = ({ langCode = LanguageCodeEnum.ENGLISH }) => {
  const [isListening, setIsListening] = useState(false);
  let recognition = useRef(null);

  const mediaRecorderRef = useRef(null);
  const { isSpeaking, audioBlob, setAudioBlob, transcript, setTranscript, onSaveInfo } = React.useContext(CoiveContext);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
      setTimeout(()=>{mediaRecorder.stop();},0)
    }
  };

  const startListening = () => {
    recognition.current.start();
    setTranscript('')
  };

  useEffect(() => {
    recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let a = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.current.lang = langCode;

    recognition.current.onstart = () => {
      setIsListening(true);
      startRecording()
    };

    recognition.current.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.current.onend = () => {
      setIsListening(false);
      stopRecording();
    };

    recognition.current.onerror = (event) => {
      setIsListening(false);
      stopRecording();
    };

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        {
          transcript
            ?
            <>
              <ButtonPlayAudio audioBlob={audioBlob}/>
              <Typography className='typographyStyle ps-4 ' variant="subtitle1">You Responded: "{transcript}"</Typography>
            </>
            :
            <IconButton disabled={isSpeaking} style={{ backgroundColor: '#cccc' }} aria-label="delete" size="large" onClick={startListening}>
              {
                isListening
                  ?
                  <SettingsVoiceIcon fontSize="inherit" />
                  :
                  <KeyboardVoiceIcon fontSize="inherit" />

              }
            </IconButton>
        }
      </div>
      {
        transcript
          ?
          <div className='d-flex justify-content-end pt-5'>
            <Button className='me-3' variant="contained" endIcon={<ReplayIcon />} onClick={() => setTranscript('')}>Retry</Button>
            <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={onSaveInfo}>Save</Button>
          </div>
          : <></>
      }

    </>

  );
};

export default SpeechRecognitionComponent;
