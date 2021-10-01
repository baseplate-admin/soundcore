import axios from 'axios';
import { APIPath } from '../../../Config/Api';
import { APIUrl } from '../../../Config/App';
import { PostVolume } from '../../Backend/Volume';
import { GetJWTTokenInLocalStorage } from './JWTCookie';

export const SetVolumeInLocalStorage = async (volume: Number) => {
    switch (true) {
        case volume > 1: {
            throw new Error('Volume Must be lower than 1.0');
        }
        case volume < 0: {
            throw new Error('Volume must be above 0.0');
        }
        case 0 <= Number(volume) && volume <= 1: {
            PostVolume(Number(volume));
            localStorage.setItem('Howler_Volume', volume?.toString());
        }
    }
};

export const GetVolumeInLocalStorage = () => {
    const volume = localStorage.getItem('Howler_Volume');
    switch (volume) {
        case null: {
            // This means theres no volume object.
            //  A fresh Browser should have no volume object.
            const token = GetJWTTokenInLocalStorage();
            if (token) {
                const config = {
                    headers: {
                        'Content-Type': `application/json`,
                        Authorization: `Bearer ${token}`,
                    },
                };

                const base = APIUrl;
                const endPoint = APIPath.CAPTURE_VOLUME;

                const url = `${base}${endPoint}`;

                axios
                    .get(url, config)
                    .then((res) => {
                        if (res?.status === 200) {
                            localStorage.setItem(
                                'Howler_Volume',
                                res.data.volume.toString()
                            );
                            console.log('Backend Volume Synced');
                        }
                    })
                    .catch((e) => {
                        console.error(
                            `Backend Volume Can't be synced | Reason : ${e}`
                        );
                    });
            } else {
                console.error('Token Not Found | Cannot Get Volume');
            }

            return localStorage.getItem('Howler_Volume');
        }
        case undefined: {
            throw new Error('Why is Volume Undefined');
        }
        default: {
            return volume;
        }
    }
};
