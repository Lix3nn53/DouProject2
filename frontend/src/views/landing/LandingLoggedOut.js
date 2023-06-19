import './styles.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Container, Box, Typography, Stack, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const LandingPage = () => {
    const user = useSelector((state) => state.user);

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                    m: 4
                }}
            >
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        Let Me Correct You
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph marginTop={'40px'}>
                        Transform your editing process with AI-powered writing assistant. Effortlessly correct articles, generate ideas, and
                        reclaim your time. Step into the future of editing today!
                    </Typography>
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" component={Link} to="/pages/register">
                            Register
                        </Button>
                        <Button variant="outlined" component={Link} to="/pages/login">
                            Login
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 4,
                    pb: 2,
                    m: 4
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Finally, all your writing needs in one place.
                    </Typography>
                </Container>
            </Box>
        </div>
    );
};

export default LandingPage;
