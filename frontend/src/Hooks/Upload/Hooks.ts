import axios from 'axios';
import { APIPath } from '../../Config/Api';
import { APIUrl } from '../../Config/App';

import FormData from 'form-data';
// import { SetJWTTokenInLocalStorage } from '../../Helpers/JWTCookie';

export const useMusicUpload = () => {
    // const dispatch = useAppDispatch();

    const MusicUploadSingle = async (file: File) => {
        const base = APIUrl;
        const endPoint = APIPath.UPLOAD_MUSIC_PATH;

        const url = `${base}${endPoint}`;
        // const url = `https://jsonplaceholder.typicode.com/posts`;

        let data = new FormData();
        data.append('file', file, file.name);

        const config = {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        };

        const res = await axios.put(url, data, config);

        return await res;
    };
    return [MusicUploadSingle];
};
