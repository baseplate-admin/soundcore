// Bulma Import
import 'bulma/bulma.sass';

// Font Import
import '../Extras/Font.scss';

// React import
import { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Routing Enum Function
import { RoutingPath } from './routing';

// Components
import { FormWithInputBoxComponent } from '../Components/App/FormWithInputBox/FormWithInputBox';

// Loaders
import { HomePageLoaderApp } from '../Components/Loaders/HomePageLoader/HomePageLoader';
import { FormWithInputBoxLoader } from '../Components/Loaders/FormWithInputBox/FormWithInputBoxLoader';

export const App = () => {
    const HomePage = lazy(() =>
        import('./Home/Index/HomeApp').then(({ HomePage }) => ({
            default: HomePage,
        }))
    );

    const LoginPage = lazy(() =>
        import('./Accounts/Login/LoginApp').then(({ LoginPage }) => ({
            default: LoginPage,
        }))
    );

    const RegisterPage = lazy(() =>
        import('./Accounts/Register/RegisterApp').then(({ RegisterPage }) => ({
            default: RegisterPage,
        }))
    );

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route path={RoutingPath.HOME_PAGE} exact>
                        <Suspense fallback={HomePageLoaderApp}>
                            <HomePage />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.LOGIN_PAGE} exact>
                        <Suspense fallback={<FormWithInputBoxLoader />}>
                            <FormWithInputBoxComponent children={LoginPage} />
                        </Suspense>
                    </Route>
                    <Route path={RoutingPath.REGISTER_PAGE} exact>
                        <Suspense fallback={<FormWithInputBoxLoader />}>
                            <FormWithInputBoxComponent
                                children={RegisterPage}
                            />
                        </Suspense>
                    </Route>
                    {/* <Route path="/loader" component={HashLoader} /> */}
                </Switch>
            </Router>
        </Fragment>
    );
};
