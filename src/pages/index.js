import { useForm } from "react-hook-form";
import React, { useRef, useState } from 'react';
import RegisterComponent from '@/components/voice/registerComponent';
import NavBar from '@/components/navbar';
import VoiceComponent from '@/components/voice/voiceComponent';
import { CoiveContext } from '@/hooks/voiceContext';
import { LIST_INFO_KEY } from '@/utils/constants';
import { base64ToBlob, blobToBase64, checkTextAndLanguage } from '@/utils';
import SuccessForm from "@/components/voice/successForm";

const statusForm = {
  Register: 'REGISTER',
  Voice: 'VOICE',
  Success: 'SUCCESS'
}

export default function Home() {
  const { handleSubmit, control, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      name: "",
      language: "",
    },
    mode: "onChange"
  });

  const language = watch('language');
  const name = watch('name');
  const statusRef = useRef(statusForm.Register);
  const isFormValid = Object.keys(errors).length === 0;

  const onSubmit = (data) => {
    statusRef.current = statusForm.Voice;
  };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');

  const resetData = () => {
    reset({ name: "", language: "" });
    setTranscript('');
    setAudioBlob(null);
    setIsSpeaking(false);
    statusRef.current = statusForm.Success
  }

  const onSaveInfo = () => {
    try {
      const isAgree = checkTextAndLanguage(transcript, language)
      blobToBase64(audioBlob).then(audioBlobBase64 => {
        const dataInStorage = localStorage.getItem(LIST_INFO_KEY)
        let localStorageData = JSON.parse(dataInStorage ? dataInStorage : `[]`);
        localStorageData.push({
          name,
          language,
          audioBlobBase64,
          isAgree
        })
        localStorage.setItem(LIST_INFO_KEY, JSON.stringify(localStorageData));
        resetData();
      });

    } catch (err) {
      localStorage.setItem(LIST_INFO_KEY, `[]`);
    }
  }

  const onRedirectConsentPage = () => {
    resetData();
  }

  return (
    <div>
      <NavBar />
      {
        statusRef.current === statusForm.Register &&
        <RegisterComponent control={control} handleSubmit={handleSubmit(onSubmit)} isFormValid={isFormValid} errors={errors} />
      }
      {
        statusRef.current === statusForm.Voice &&
        <CoiveContext.Provider value={{ isSpeaking, setIsSpeaking, audioBlob, setAudioBlob, transcript, setTranscript, onSaveInfo }}>
          <VoiceComponent language={language} />
        </CoiveContext.Provider>
      }
      {
        statusRef.current === statusForm.Success &&
        <CoiveContext.Provider value={{ resetData }}>
          <SuccessForm/>
        </CoiveContext.Provider>

      }
    </div>
  )
}
