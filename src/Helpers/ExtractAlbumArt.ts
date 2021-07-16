import * as musicMetadata from 'music-metadata-browser';
import { MutableRefObject } from 'react';
import _ from 'lodash';

export const getAlbumArtFromBlob = (
    blob: File,
    i: number,
    imageRefArray: MutableRefObject<any>
) => {
    (async () => {
        const metadata = await musicMetadata.parseBlob(blob);
        const item: any = await _.first(metadata.common.picture);

        const base64Str = JSON.stringify(item);
        const base64Object = Buffer.from(base64Str).toString('base64');

        const base64Response = `data:${item.format};base64,${base64Object}`;

        imageRefArray.current[i].src = base64Response;

        // metadata has all the metadata found in the blob or file
    })();

    // let data = await Promise.resolve(metadata.common.picture);
    // console.log(data);
    // Promise.resolve(data).then((res) => {
    // });
};
