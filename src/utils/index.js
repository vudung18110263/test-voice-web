import { createTheme } from '@mui/material/styles';
import englishJson from './constants/english.json';
import frenchJson from './constants/french.json';
import { LanguageCodeEnum, LanguageEmun } from '@/types';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#d2d2d2',
        }
    },
});

export const getDataText = (LanguageCode) => {
    if (LanguageCodeEnum.ENGLISH === LanguageCode) {
        return englishJson;
    }
    return frenchJson;
}

export function checkTextAndLanguage(text, languageCode) {
    const lowercaseText = text.toLowerCase();
    if (lowercaseText === 'yes' && languageCode === LanguageEmun.ENGLISH) {
        return true;
    } else if (lowercaseText === 'oui' && languageCode === LanguageEmun.FRENCH) {
        return true;
    } else {
        return false;
    }
}

export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Convert the Base64 string back to Blob
export function base64ToBlob(base64String) {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    return new Blob([new Uint8Array(byteArrays)], { type: 'text/plain' });
}