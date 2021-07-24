import * as mm from 'music-metadata-browser';
import { MutableRefObject } from 'react';

export const ExtractSongName = async (
    url: string,
    artistRefArray: MutableRefObject<Array<HTMLDivElement>>,
    i: number
) => {
    const metadata = await mm.fetchFromUrl(url);

    if (metadata.common.title) {
        const p = document.createElement('p');
        const text = document.createTextNode(metadata.common.title);

        if (artistRefArray.current[i].childElementCount === 0) {
            p.appendChild(text);
            artistRefArray.current[i].appendChild(p);
        }
    }
};

export const ExtractArtistName = async (
    url: string,
    artistRefArray: MutableRefObject<Array<HTMLDivElement>>,
    i: number
) => {
    const metadata = await mm.fetchFromUrl(url);

    if (metadata.common.artist) {
        const p = document.createElement('p');
        const text = document.createTextNode(metadata.common.artist);

        if (artistRefArray.current[i].childElementCount === 0) {
            p.appendChild(text);
            artistRefArray.current[i].appendChild(p);
        }
    }
};

export const getAlbumArtFromBlob = async (
    blob: File,
    i: number,
    imageRefArray: MutableRefObject<Array<HTMLImageElement>>
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
    imageRefArray: MutableRefObject<Array<HTMLDivElement>>
) => {
    // const item: any = await _.first(metadata.common.picture);
    // reader.onload = (res) => console.log(res);
    // console.log(base64Object);
    const metadata = await mm.fetchFromUrl(url);
    const cover = mm.selectCover(metadata.common.picture); // pick the cover image

    const base64 = `data:${cover?.format};base64,${cover?.data.toString(
        'base64'
    )}`;

    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.height = 200;
        canvas.width = 200;

        let ctx = canvas.getContext('2d');

        ctx?.drawImage(image, 0, 0, 200, 200);

        if (imageRefArray.current[i].childElementCount === 0) {
            imageRefArray.current[i].appendChild(canvas);
        }
    };

    image.src = base64;
};
