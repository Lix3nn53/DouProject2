import { useEffect, useState, useRef } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX, IconSend } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

// api
import { grammerCorrection } from '../../../api/aiAPI';

// components
import LexicalEditor from '../../../ui-component/lexical/LexicalEditor';

const Title = styled('h1', { shouldForwardProp })(({ theme }) => ({
    textAlign: 'center',
    fontSize: '24px'
}));

const SubTitle = styled('h1', { shouldForwardProp })(({ theme }) => ({
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600'
}));

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const innerRef = useRef(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    function handleClick() {
        const a = innerRef.current.getSelectedNodeText();
        console.log('ref', a);
    }

    const grammerCorrectionButton = () => {
        const value = innerRef.current.getSelectedNodeText();

        // Send to backend
        grammerCorrection(value).then((res) => {
            console.log(res);
            innerRef.current.setSelectedNodeText(res);
        });
    };

    return (
        <Grid container spacing={gridSpacing} flex={1} flexDirection={'row'} height={'100%'}>
            <Box flex={2} height={'100%'} display={'flex'}>
                <LexicalEditor ref={innerRef} />
            </Box>
            <Box flex={1} height={'100%'} display={'flex'} flexDirection={'column'} marginTop={'24px'}>
                <Title>Ask AI</Title>
                <SubTitle>Edit or review selection</SubTitle>
                <Box display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={grammerCorrectionButton}>
                        Fix spelling and grammer
                    </Button>
                </Box>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={handleClick}>
                        Make shorter
                    </Button>
                </Box>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={handleClick}>
                        Make longer
                    </Button>
                </Box>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={handleClick}>
                        Change tone {'>'}
                    </Button>
                </Box>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={handleClick}>
                        Simplify language
                    </Button>
                </Box>
                <SubTitle>Generate from selection</SubTitle>
                <SubTitle>Write with AI</SubTitle>
                <SubTitle>Draft with AI</SubTitle>
            </Box>
        </Grid>
    );
};

export default Dashboard;
