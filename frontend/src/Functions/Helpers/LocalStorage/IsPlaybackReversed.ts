export const GetReversePlaybackStatus = () => {
    const isReverse = localStorage.getItem('Reverse_Playback');

    switch (isReverse) {
        case null: {
            localStorage.setItem('Reverse_Playback', 'false');
            let newItem = localStorage.getItem('Reverse_Playback');

            // A little Function to convert to boolean
            if (newItem) {
                return JSON.parse(newItem.toLowerCase());
            } else {
                break;
            }
        }
        case undefined: {
            throw new Error('Why is Reverse PlayBack Undefined');
        }
        default: {
            // return boolean
            return JSON.parse(isReverse.toLowerCase());
        }
    }
};

export const SetReversePlaybackStatus = async (value: boolean) => {
    switch (value) {
        case true: {
            localStorage.setItem('Reverse_Playback', 'true');
            break;
        }
        case false: {
            localStorage.setItem('Reverse_Playback', 'false');
            break;
        }
    }
};
