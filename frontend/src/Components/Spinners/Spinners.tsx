import { Fragment } from 'react';
import { HashLoader } from './HashLoader/HashLoader';
import { ClimbingBoxLoader } from './ClimbingBoxLoader/ClimbingBoxLoader';

enum SpinnerTypes {
    climbingbox = 'ClimbingBoxLoader',
    hash = 'HashLoader',
}

export const randomSpinnerPicker = () => {
    const spinnerArray = Object.values(SpinnerTypes);

    return spinnerArray?.[Math.floor(Math.random() * spinnerArray?.length)];
};

interface SpinnerProps {
    type: string;
}

export const SpinnerComponent = (props: SpinnerProps) => {
    switch (props?.type) {
        case SpinnerTypes?.climbingbox: {
            return <ClimbingBoxLoader />;
        }
        case SpinnerTypes?.hash: {
            return <HashLoader />;
        }
        default: {
            return <Fragment></Fragment>;
        }
    }
};
