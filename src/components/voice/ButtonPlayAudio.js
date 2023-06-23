import { Button, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from "react";

export default function ButtonPlayAudio({ audioBlob }) {
    const audio = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const handleClick = () => {
        if (!audioBlob) {
            return
        }

        if (!(audio && audio?.current)) {
            return;
        }

        audio.current.play();
        setTimeout(() => {
            audio.current.play();
        }, 0)
    }

    useEffect(() => {
        if (audio.current) {
            const handleAudioStateChange = () => {
                try {
                    setIsAudioPlaying(!audio?.current?.paused);

                    !audio.current.paused && audio.current.play()
                } catch (err) { }
            };

            audio.current?.addEventListener('pause', handleAudioStateChange);
            audio.current?.addEventListener('play', handleAudioStateChange);

            return () => {
                audio.current?.removeEventListener('pause', handleAudioStateChange);
                audio.current?.removeEventListener('play', handleAudioStateChange);
            };
        }
    }, []);

    return (
        <>
            <IconButton size="large" onClick={handleClick} style={{ backgroundColor: '#cccc' }} >
                {isAudioPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            {audioBlob ? <audio controls src={URL.createObjectURL(audioBlob)} ref={audio} style={{ display: 'none' }} /> : <></>}
        </>

    )
}