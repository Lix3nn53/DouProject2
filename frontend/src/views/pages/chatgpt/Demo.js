import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing} flex={1}>
            <Grid item xs={12}>
                AAAAAAAAAAAA
            </Grid>
            <Grid item xs={12}>
                AAA
            </Grid>
        </Grid>
    );
};

export default Dashboard;
