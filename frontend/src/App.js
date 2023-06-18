import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// api
import { currentUser } from './api/authAPI';

// redux types
import { LOGIN } from './store/actions';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await currentUser();

                // has id property
                if (response.id) {
                    dispatch({ type: LOGIN, data: response });
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
