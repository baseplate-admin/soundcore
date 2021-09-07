import axios from 'axios';
import { Howl } from 'howler';
import { useAppDispatch } from '../Store/Hooks';
import {
    updateCurrentSeconds,
    updateSongState,
    updateStatusToPlay,
    updateTotalSeconds,
} from '../../Store/Redux/Slices/Footer';
import { APIPath } from '../../Config/Api';
import { APIUrl, MediaUrl } from '../../Config/App';
import { useHowlerStore } from './Store';

interface IHowlCreateObject {
    src: string;
    data?: {
        name: string;
        artist: string;
        image: string | undefined;
        sampleRate: string;
    };
}

export const useHowler = () => {
    const dispatch = useAppDispatch();
    const { howlerState, setHowlerState } = useHowlerStore();

    let customInterval: ReturnType<typeof setInterval>;

    const CreateHowl = (props: IHowlCreateObject) => {
        const name: string = props?.data?.name ?? '';
        const artist: string = props?.data?.artist ?? '';
        const image: string = props?.data?.image ?? '';
        const sampleRate: string = props?.data?.sampleRate ?? '';

        dispatch(
            updateSongState({ data: { name, artist, image, sampleRate } })
        );

        const sound = new Howl({
            src: props?.src,
            html5: true,
            preload: true,
            autoplay: false,

            onplayerror: async () => {
                // HowlerJS might not play correctly on Chrome Mobile.
                // A little hack to make it work
                sound?.once('unlock', () => {
                    sound?.play();
                });
            },
            onload: async () => {
                // Set total seconds in footer
                dispatch(updateTotalSeconds(sound?.duration()));
                setHowlerState([sound]);
            },
            onplay: async (): Promise<void> => {
                dispatch(updateStatusToPlay());
                // console.log(howlerState);
                const startInterval = async () => {
                    customInterval = setInterval(async () => {
                        if (sound?.playing()) {
                            let currentPos = sound?.seek();
                            dispatch(updateCurrentSeconds(Number(currentPos)));
                        }
                    }, 1000);
                };
                clearInterval(customInterval);
                await startInterval();
            },

            onend: async () => {
                dispatch(updateCurrentSeconds(0));
                clearInterval(customInterval);

                const url = `${APIUrl}${APIPath?.RANDOM_SONG_ENDPOINT}`;
                const res = await axios.get(url);

                const name: string = res?.data?.song_name ?? '';
                const artist: string = res?.data?.artist ?? '';
                const image: string = res?.data?.album_art ?? '';
                const sampleRate: string = res?.data?.sample_rate ?? '';

                const src = `${MediaUrl}${res?.data?.song_file}` ?? undefined;

                const _sound = CreateHowl({
                    src,
                    data: { name, artist, image, sampleRate },
                });
                _sound?.play();
                setHowlerState([_sound]);
            },
        });
        return sound;
    };

    return {
        CreateHowl,
        howlerState,
    };
};
