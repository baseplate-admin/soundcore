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
   
    imageRefArray.current[i].src = `data:${cover?.format};base64,${cover?.data.toString('base64')}`;
    
};
