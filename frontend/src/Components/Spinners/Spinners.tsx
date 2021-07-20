import { ClimbingBoxLoader } from './ClimbingBoxLoader/ClimbingBoxLoader';
import { HashLoader } from './HashLoader/HashLoader';

enum SpinnerTypes {
    climbingbox = 'ClimbingBoxLoader',
    hash = 'HashLoader',
}

export const randomSpinnerPicker = () => {
    const spinnerArray = Object.values(SpinnerTypes);

    return spinnerArray[Math.floor(Math.random() * spinnerArray.length)];
};

interface SpinnerProps {
    type: string;
}

export const SpinnerComponent = (props: SpinnerProps) => {
    switch (props.type) {
        case SpinnerTypes.climbingbox: {
            return <ClimbingBoxLoader />;
        }
        case SpinnerTypes.hash: {
            return <HashLoader />;
        }
        default: {
            return null;
        }
    }
};
