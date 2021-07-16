import axios from 'axios';
import { APIPath, APIUrl } from '../../Pages/routing';

// import { SetJWTTokenInLocalStorage } from '../../Helpers/JWTCookie';

export const useUpload = () => {
    // const dispatch = useAppDispatch();

    let axiosArray: Array<any> = [];

    const MusicUpload = (filesArray: Array<object>) => {
        const base = APIUrl;
        const endPoint = APIPath.UPLOAD_MUSIC_PATH;

        // const url = `${base}${endPoint}`;
        const url = `https://jsonplaceholder.typicode.com/posts`;

        for (let i: number = 0; i < filesArray.length; i++) {
            let data = {
                song: filesArray[i],
            };
            let res = axios({
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                method: 'POST',
                url: url,
                data: data,
            });
            axiosArray.push(res);
        }

        axios
            .all(axiosArray)
            .then(
                axios.spread((...responses) => {
                    responses.forEach((res) => console.log(res));
                    console.log('Sumitted All Musics');
                })
            )
            .catch((error) => {
                console.log(error);
            });
    };
    return [MusicUpload];
};
