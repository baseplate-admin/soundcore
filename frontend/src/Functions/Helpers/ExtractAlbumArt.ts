import { parseBlob, selectCover } from 'music-metadata-browser';
import { MutableRefObject } from 'react';

export const getAlbumArtFromBlob = async (
    blob: File,
    i: number,
    imageRefArray: MutableRefObject<any>
) => {
    // const item: any = await _.first(metadata.common.picture);
    // reader.onload = (res) => console.log(res);
    // console.log(base64Object);
    const metadata = await parseBlob(blob);
    const cover = selectCover(metadata.common.picture); // pick the cover image

    try {
        if (imageRefArray.current[i].currentSrc === '') {
            imageRefArray.current[i].src = `data:${
                cover?.format
            };base64,${cover?.data.toString('base64')}`;
        }
    } catch {}
};
