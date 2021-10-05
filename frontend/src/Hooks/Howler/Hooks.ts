import axios from 'axios';
import { Howl } from 'howler';
import { useAppDispatch, useAppSelector } from '../Store/Hooks';
import {
    selectFooterState,
    updateCurrentSeconds,
    updateSongState,
    updateStatusToPause,
    updateStatusToPlay,
    updateTotalSeconds,
} from '../../Store/Redux/Slices/Footer';
import { APIPath } from '../../Config/Api';
import { APIUrl, MediaUrl } from '../../Config/App';
import { PostPreviousSong } from '../../Functions/Backend/Song';
import { GetJWTTokenInLocalStorage } from '../../Functions/Helpers/LocalStorage/JWTCookie';

interface IHowlCreateObject {
    data: {
        name: string;
        artist: string;
        image: string | undefined;
        sampleRate: string;
        src: string;
    };
}

// Global Song Variable
const howlerArray: Howl[] = [];

export const useHowler = () => {
    const dispatch = useAppDispatch();
    const footerState = useAppSelector(selectFooterState);

    let customInterval: ReturnType<typeof setInterval>;

    const howlerOnEnd = async () => {
        dispatch(updateCurrentSeconds(0));
        clearInterval(customInterval);

        const url = `${APIUrl}${APIPath?.RANDOM_SONG_ENDPOINT}`;
        const res = await axios.get(url);

        const name: string = res?.data?.song_name ?? '';
        const artist: string = res?.data?.artist ?? '';
        const image: string = `${MediaUrl}${res?.data?.album_art}` ?? '';
        const sampleRate: string = res?.data?.sample_rate ?? '';

        dispatch(
            updateSongState({ data: { name, artist, image, sampleRate } })
        );

        const _sound = new Howl({
            src: `${MediaUrl}${res?.data?.song_file}` ?? undefined,
            html5: true,
            preload: true,
            autoplay: false,

            onplayerror: async () => {
                await howlerOnPlayError(_sound);
            },
            onload: async () => {
                await howlerOnLoad(_sound);
            },
            onplay: async () => {
                await howlerOnPlay(_sound);
            },

            onend: async () => {
                await howlerOnEnd();
            },
        });

        if (howlerArray?.length === 0) {
            // No previous song played. So New instance
            howlerArray?.push(_sound);
            _sound?.play();

            PostPreviousSong(name);
        } else if (howlerArray?.length > 0) {
            // The array is not empty. Stop the previous songs and dont post to backend
            const previous_song = howlerArray[0];
            previous_song?.stop();
            howlerArray?.shift();

            PostPreviousSong(name);
            howlerArray.push(_sound); // Push to array
            _sound?.play(); // Finally Play the song
        }
    };

    const howlerOnPlay = async (sound: Howl) => {
        dispatch(updateStatusToPlay());
        const startInterval = async () => {
            customInterval = setInterval(async () => {
                if (sound?.playing()) {
                    let currentPos = sound?.seek();
                    dispatch(updateCurrentSeconds(Number(currentPos)));
                }
            }, 1000);
        };
        clearInterval(customInterval);
        startInterval();
    };

    const howlerOnLoad = async (sound: Howl) => {
        // Set total seconds in footer
        dispatch(updateTotalSeconds(sound?.duration()));
    };

    const howlerOnPlayError = async (sound: Howl) => {
        // HowlerJS might not play correctly on Chrome Mobile.
        // A little hack to make it work
        sound?.once('unlock', () => {
            sound?.play();
        });
    };

    const CreateHowl = (props: IHowlCreateObject) => {
        const name: string = props?.data?.name ?? '';
        const artist: string = props?.data?.artist ?? '';
        const image: string = props?.data?.image ?? '';
        const sampleRate: string = props?.data?.sampleRate ?? '';

        dispatch(
            updateSongState({ data: { name, artist, image, sampleRate } })
        );

        const sound = new Howl({
            src: props?.data?.src,
            html5: true,
            preload: true,
            autoplay: false,

            onplayerror: async () => {
                await howlerOnPlayError(sound);
            },
            onload: async () => {
                await howlerOnLoad(sound);
            },
            onplay: async () => {
                await howlerOnPlay(sound);
            },

            onend: async () => {
                await howlerOnEnd();
            },
        });
        if (howlerArray?.length === 0) {
            // No previous song played. So New instance
            sound?.play();
            PostPreviousSong(name);
            howlerArray?.push(sound);
        } else if (howlerArray?.length > 0) {
            // The array is not empty. Stop the previous songs and dont post to backend
            const previous_song = howlerArray[0];
            previous_song?.stop();
            howlerArray?.shift();

            sound?.play();
        }
        return sound;
    };

    const HandlePreviousSong = () => {
        const base = APIUrl;
        const endPoint = APIPath.CAPTURE_PREVIOUS_SONG;

        const url = `${base}${endPoint}`;

        const token = GetJWTTokenInLocalStorage();

        if (token) {
            const config = {
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`,
                },
            };
            axios
                .get(url, config)
                .then((res) => {
                    const name: string =
                        res?.data?.previous_song.song_name ?? '';
                    const artist: string =
                        res?.data?.previous_song.artist ?? '';
                    const image: string = `${MediaUrl}${
                        res?.data?.previous_song.album_art ?? ''
                    }`;
                    const sampleRate: string =
                        res?.data?.previous_song.sample_rate ?? '';

                    dispatch(
                        updateSongState({
                            data: { name, artist, image, sampleRate },
                        })
                    );

                    const _sound = new Howl({
                        src: `${MediaUrl}${res?.data?.previous_song.song_file}`,
                        html5: true,
                        preload: true,
                        autoplay: false,

                        onplayerror: async () => {
                            await howlerOnPlayError(_sound);
                        },
                        onload: async () => {
                            await howlerOnLoad(_sound);
                        },
                        onplay: async () => {
                            await howlerOnPlay(_sound);
                        },

                        onend: async () => {
                            await howlerOnEnd();
                        },
                    });

                    if (howlerArray?.length === 0) {
                        // No previous song played. So New instance
                        howlerArray?.push(_sound);
                        _sound?.play();
                    } else if (howlerArray?.length > 0) {
                        // The array is not empty. Stop the previous songs and dont post to backend
                        const previous_song = howlerArray[0];
                        previous_song?.stop();
                        howlerArray?.shift();
                        // Finally Play the song
                        howlerArray.push(_sound);
                        _sound?.play();
                    }
                })
                .catch((e) => {
                    console.error(`Cannot get previous song | Reason : ${e}`);
                });
        } else {
            console.error(
                'Cannot Get Previous Song | Reason : Token Not Found'
            );
        }
    };

    const HandlePlayPause = () => {
        const sound: Howl = howlerArray[0];

        // Song might be null if User didn't click anything
        switch (sound) {
            case undefined: {
                console.error('No song is playing');
                break;
            }
            default: {
                if (footerState?.song?.global?.playing && sound?.playing()) {
                    // Means playing
                    dispatch(updateStatusToPause());
                    sound?.pause();
                } else if (
                    !footerState?.song?.global?.playing &&
                    !sound?.playing()
                ) {
                    // Means paused
                    dispatch(updateStatusToPlay());
                    sound?.play();
                }
            }
        }
    };
    return {
        CreateHowl,
        HandlePreviousSong,
        HandlePlayPause,
        howlerArray,
    };
};
