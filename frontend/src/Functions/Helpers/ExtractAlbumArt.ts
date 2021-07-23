import * as mm from 'music-metadata-browser';
import { MutableRefObject } from 'react';

export const getAlbumArtFromBlob = async (
    blob: File,
    i: number,
    imageRefArray: MutableRefObject<any>
) => {
    // const item: any = await _.first(metadata.common.picture);
    // reader.onload = (res) => console.log(res);
    // console.log(base64Object);
    const metadata = await mm.parseBlob(blob);
    const cover = mm.selectCover(metadata.common.picture); // pick the cover image

    const base64 = `data:${cover?.format};base64,${cover?.data.toString(
        'base64'
    )}`;

    try {
        if (imageRefArray.current[i].currentSrc !== base64) {
            imageRefArray.current[i].src = base64;
        }
    } catch {}
};

export const getAlbumArtFromUrl = async (
    url: string,
    i: number,
    imageRefArray: MutableRefObject<any>
) => {
    // const item: any = await _.first(metadata.common.picture);
    // reader.onload = (res) => console.log(res);
    // console.log(base64Object);
    const metadata = await mm.fetchFromUrl(url);
    const cover = mm.selectCover(metadata.common.picture); // pick the cover image
    const base64 = `data:${cover?.format};base64,${cover?.data.toString(
        'base64'
    )}`;

    try {
        if (imageRefArray.current[i].currentSrc !== base64) {
            imageRefArray.current[i].src = base64;
        }
    } catch {}
};
