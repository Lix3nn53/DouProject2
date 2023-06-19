import './styles.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid, Container, Box, Typography, Stack, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';

// project imports
import LandingLoggedIn from './LandingLoggedIn';
import LandingLoggedOut from './LandingLoggedOut';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const LandingPage = () => {
    const user = useSelector((state) => state.user);

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const renderPage = () => {
        if (user.user) {
            return <LandingLoggedIn />;
        } else {
            return <LandingLoggedOut />;
        }
    };

    return renderPage();
};

export default LandingPage;
