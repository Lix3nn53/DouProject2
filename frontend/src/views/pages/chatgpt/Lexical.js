import { useEffect, useState } from 'react';

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
    const [chatHistory, setChatHistory] = useState(['Hello! Write an english sentence to get a grammer correction.']);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const theme = useTheme();
    const [value, setValue] = useState('');

    const renderChatHistory = () => {
        const result = [];

        chatHistory.forEach((chat, index) => {
            if (index % 2 === 0) {
                result.push(
                    <ChatBubbleResponse component="div">
                        <ChatBubbleInner>{chat}</ChatBubbleInner>
                    </ChatBubbleResponse>
                );
            } else {
                result.push(
                    <ChatBubbleSent>
                        <ChatBubbleInner>{chat}</ChatBubbleInner>
                    </ChatBubbleSent>
                );
            }
        });

        return result;
    };

    const onChatSubmit = (value) => {
        const chatAfterInput = [...chatHistory, value, '...'];
        setChatHistory(chatAfterInput);
        setValue('');
        // Scroll to bottom after delay
        setTimeout(() => {
            const chat = document.getElementById('chat');
            chat.scrollTop = chat.scrollHeight;
        }, 100);

        // Send to backend
        grammerCorrection(value).then((res) => {
            console.log(res);
            // replace last element with response
            const chatAfterBotResponse = [...chatAfterInput];
            chatAfterBotResponse[chatAfterBotResponse.length - 1] = res;
            setChatHistory(chatAfterBotResponse);
        });
    };

    return (
        <Grid container spacing={gridSpacing} flex={1} flexDirection={'column'} height={'100%'}>
            <LexicalEditor />
        </Grid>
    );
};

export default Dashboard;
