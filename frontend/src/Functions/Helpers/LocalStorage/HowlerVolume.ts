export const SetVolumeInLocalStorage = async (volume: Number) => {
    switch (true) {
        case volume > 1: {
            throw new Error('Volume Must be lower than 1.0');
        }
        case volume < 0: {
            throw new Error('Volume must be above 0.0');
        }
        case 0 <= Number(volume) && volume <= 1: {
            localStorage.setItem('Howler_Volume', volume.toString());
        }
    }
};

export const GetVolumeInLocalStorage = () => {
    const volume = localStorage.getItem('Howler_Volume');
    switch (volume) {
        case null: {
            // This means theres no volume object.
            //  A fresh Browser should have no volume object
            // localStorage.setItem('Howler_Volume', (0.2).toString());
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
