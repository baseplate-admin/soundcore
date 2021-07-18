import axios from 'axios';
import { APIPath, APIUrl } from '../../Routes';

// import { SetJWTTokenInLocalStorage } from '../../Helpers/JWTCookie';

export const useMusicUpload = () => {
    // const dispatch = useAppDispatch();

    const MusicUploadSingle = async (files: object) => {
        const base = APIUrl;
        const endPoint = APIPath.UPLOAD_MUSIC_PATH;

        // const url = `${base}${endPoint}`;
        const url = `https://jsonplaceholder.typicode.com/posts`;

        const data = {
            files: files,
        };
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axios.post(url, data, config);

        return await res;
    };
    return [MusicUploadSingle];
};
