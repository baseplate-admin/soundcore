import { useEffect, useState, Fragment } from 'react';
import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../../../Components/Spinners/Spinners';

export const PromiseLoaderChildComponent = () => {
    const [spinner, setSpinner] = useState('');

    useEffect(() => {
        const randomSpinnerItem = randomSpinnerPicker();
        setSpinner(randomSpinnerItem.toString());
    }, []);

    return (
        <Fragment>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <SpinnerComponent type={spinner} />
                    </div>
                </div>
            </div>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <p className="heading file_uploaded_text">
                        Uploading Songs
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
