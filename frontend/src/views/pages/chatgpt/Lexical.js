import { useEffect, useState, useRef } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';
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

const Chat = styled(Card, { shouldForwardProp })(({ theme }) => ({
    flex: 1,
    height: '76vh',
    maxHeight: '76vh',
    width: '98%',
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'column-reverse',
    overflowY: 'scroll'
}));

const ChatBubbleResponse = styled(Card, { shouldForwardProp })(({ theme }) => ({
    margin: 16,
    display: 'flex'
}));

const ChatBubbleSent = styled(Card, { shouldForwardProp })(({ theme }) => ({
    margin: 16,
    display: 'flex',
    flexDirection: 'row-reverse'
}));

const ChatBubbleInner = styled(Card, { shouldForwardProp })(({ theme }) => ({
    padding: 16,
    background: theme.palette.primary[200]
}));

const ChatInput = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: '98%',
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    }
}));

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const innerRef = useRef(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    function handleClick() {
        console.log('ref', innerRef);
        innerRef.current.setSelectedNodeText();
    }

    return (
        <Grid container spacing={gridSpacing} flex={1} flexDirection={'column'} height={'100%'}>
            <LexicalEditor ref={innerRef} />
            <button onClick={handleClick}>Click me</button>
        </Grid>
    );
};

export default Dashboard;
