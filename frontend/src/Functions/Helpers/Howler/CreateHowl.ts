import { Howl } from 'howler';

interface IHowlCreateObject {
    src: string;
}



export const CreateHowlObject = (props: IHowlCreateObject) => {
    const sound = new Howl({
        src: props.src,
        html5: true,
        preload: true,
        autoplay: false,

        onplayerror: () => {
            // HowlerJS might not play correctly on Chrome Mobile.
            // A little hack to make it work
            sound.once('unlock', () => {
                sound.play();
            });
        },
        onload: () => {
            // Set total seconds in footer
       
        },
    });
    return sound;
};
