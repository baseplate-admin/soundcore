import { Fragment } from 'react';
import { IoCloudOfflineOutline } from 'react-icons/io5';

interface IPromiseErrorChildComponent {
    errorFiles: Array<Object>;
}

export const PromiseErrorChildComponent = (
    props: IPromiseErrorChildComponent
) => {
    return (
        <Fragment>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <IoCloudOfflineOutline
                            color="white"
                            style={{ transform: 'scale(4)' }}
                        />
                    </div>
                </div>
            </div>
            <div>{props.errorFiles}</div>
        </Fragment>
    );
};
