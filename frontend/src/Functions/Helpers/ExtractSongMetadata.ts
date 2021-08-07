import * as mm from 'music-metadata-browser';
import { MutableRefObject } from 'react';

export const getAlbumArtFromBlob = async (
    blob: File,
    i: number,
    imageRefArray: MutableRefObject<Array<HTMLImageElement>>
) => {
    const metadata = await mm.parseBlob(blob);
    const cover = mm.selectCover(metadata.common.picture); // pick the cover image

    const base64 = `data:${cover?.format};base64,${cover?.data.toString(
        'base64'
    )}`;

    try {
        if (
            imageRefArray !== undefined &&
            imageRefArray.current[i].currentSrc !== base64
        ) {
            imageRefArray.current[i].src = base64;
        }
    } catch {}
};
