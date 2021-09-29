import axios from 'axios';
import { APIUrl } from '../../Config/App';
import { APIPath } from '../../Config/Api';
import { GetJWTTokenInLocalStorage } from '../Helpers/LocalStorage/JWTCookie';

export const PostVolume = async (volume: number) => {
    const token = GetJWTTokenInLocalStorage();
    const data = { volume: volume };
    if (!token) {
        console.error('Volume Not Posted | Reason : Token Not Found');
    }
    const config = {
        headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
        },
    };
    const base = APIUrl;
    const endPoint = APIPath.CAPTURE_VOLUME;

    const url = `${base}${endPoint}`;

    const res = await axios.post(url, data, config).catch((e) => {
        console.error(`Backend Volume Can't be synced | Reason : ${e}`);
    });
    if (res?.status === 200) {
        console.log('Backend Volume Synced');
    }
};
