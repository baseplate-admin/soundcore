import pica from 'pica';
import { MutableRefObject } from 'react';

export const resizeImage = async (
    previousImage: any,
    size: string,
    i: number,
    imageRefArray: MutableRefObject<any>
) => {
    let splitSize = size.split('x');

    const height = parseInt(splitSize[0]);
    const width = parseInt(splitSize[1]);

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.height = height;
    resizedCanvas.width = width;

    pica()
        .resize(previousImage, resizedCanvas)
        .then((result) => {
            console.log(result);
        });
};
