import './styles.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
                        Welcome {user.user ? user.user.name : 'Guest'}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Finally, all your writing needs in one place.
                    </Typography>
                </Container>
            </Box>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 4,
                    pb: 2,
                    m: 4,
                    mb: 0
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h2" align="center" color="text.primary" paragraph>
                        Your Projects
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    <Grid item key={1} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%'
                                }}
                                image="https://source.unsplash.com/random?wallpapers"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Heading
                                </Typography>
                                <Typography>This is a media card. You can use this section to describe the content.</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default LandingPage;
