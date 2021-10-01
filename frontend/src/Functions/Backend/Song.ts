import axios from 'axios';
import { APIUrl } from '../../Config/App';
import { APIPath } from '../../Config/Api';
import { GetJWTTokenInLocalStorage } from '../Helpers/LocalStorage/JWTCookie';

export const PostPreviousSong = async (name: string) => {
    const token = GetJWTTokenInLocalStorage();
    const data = { last_song: name };
    if (!token) {
        console.error('Previous Song Not Posted | Reason : Token Not Found');
    }
    const config = {
        headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
        },
    };
    const base = APIUrl;
    const endPoint = APIPath.CAPTURE_PREVIOUS_SONG;

    const url = `${base}${endPoint}`;

    const res = await axios.post(url, data, config).catch((e) => {
        console.error(`Backend Previous Song Can't be synced | Reason : ${e}`);
    });
    if (res?.status === 200) {
        console.log('Backend Previous Song Synced');
    }
};
