import { Howl } from 'howler';
import { useState } from 'react';

export const useHowlerStore = () => {
    const [howlerState, setHowlerState] = useState<Howl[]>([]);

    return { howlerState, setHowlerState };
};
