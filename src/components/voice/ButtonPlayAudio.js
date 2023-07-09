import { Button, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from "react";

export default function ButtonPlayAudio({ audioBlob }) {
    const audio = useRef(null);

    const handleClick = () => {
        if (!audioBlob) {
            return
        }

        if (!(audio && audio?.current)) {
            return;
        }

        audio.current.play();
    }

    useEffect(() => {
        if (audio.current) {
            const handleAudioStateChange = () => {
                try {
                    const isAudioPlaying = !audio.current.paused;
                    const playIcon = document.getElementById("play-icon");
                    const pauseIcon = document.getElementById("pause-icon");

                    if (playIcon && pauseIcon) {
                        playIcon.style.display = isAudioPlaying ? "none" : "inline-block";
                        pauseIcon.style.display = isAudioPlaying ? "inline-block" : "none";
                    }
                } catch (err) { }
            };

            const handleAudioCanPlayThrough = () => {
                audio.current.removeEventListener("canplaythrough", handleAudioCanPlayThrough);
            };

            audio.current?.addEventListener('pause', handleAudioStateChange);
            audio.current?.addEventListener('play', handleAudioStateChange);
            audio.current.addEventListener("canplaythrough", handleAudioCanPlayThrough);

            return () => {
                audio.current?.removeEventListener('pause', handleAudioStateChange);
                audio.current?.removeEventListener('play', handleAudioStateChange);
                audio.current?.removeEventListener("canplaythrough", handleAudioCanPlayThrough);
            };
        }
    }, []);

    return (
        <>
            <IconButton size="large" onClick={handleClick} style={{ backgroundColor: '#cccc' }} >
                <PlayArrowIcon id="play-icon" />
                <PauseIcon id="pause-icon" style={{ display: "none" }} />
            </IconButton>
            {audioBlob ? <audio controls src={URL.createObjectURL(audioBlob)} ref={audio} style={{ display: 'none' }} /> : <></>}
        </>

    )
}