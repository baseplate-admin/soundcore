import axios from 'axios';
import FormData from 'form-data';

import { APIPath } from '../../Config/Api';
import { APIUrl } from '../../Config/App';
import { GetJWTTokenInLocalStorage } from '../../Functions/LocalStorage/JWTCookie';

export const useMusicUpload = () => {
    const MusicUploadSingle = async (file: File) => {
        const token = GetJWTTokenInLocalStorage();

        const base = APIUrl;
        const endPoint = APIPath.UPLOAD_MUSIC_PATH;

        const url = `${base}${endPoint}`;

        let data = new FormData();
        data.append('file', file, file?.name);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': `multipart/form-data`,
            },
        };

        const res = await axios.put(url, data, config);

        return await res;
    };
    return [MusicUploadSingle];
};
