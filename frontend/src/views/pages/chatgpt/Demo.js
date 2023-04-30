import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX, IconSend } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

// api
import { grammerCorrection } from '../../../api/aiAPI';

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
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const theme = useTheme();
    const [value, setValue] = useState('');

    const renderChatHistory = () => {
        const result = [];

        chatHistory.forEach((chat, index) => {
            if (index % 2 === 1) {
                result.push(
                    <ChatBubbleResponse>
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
            // remove first 3 characters and last character
            res = res.substring(3, res.length - 1);
            // replace last element with response
            const chatAfterBotResponse = [...chatAfterInput];
            chatAfterBotResponse[chatAfterBotResponse.length - 1] = res;
            setChatHistory(chatAfterBotResponse);
        });
    };

    return (
        <Grid container spacing={gridSpacing} flex={1} flexDirection={'column'} height={'100%'}>
            <Grid item flex={1}>
                <Box flex={1} height={'100%'}>
                    <Chat id="chat">{renderChatHistory()}</Chat>
                </Box>
            </Grid>
            <Grid item>
                <Box flex={1}>
                    <ChatInput
                        id="input-chat"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onSubmit={(e) => onChatSubmit(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onChatSubmit(e.target.value);
                            }
                        }}
                        placeholder="Enter your text..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconSend stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                            </InputAdornment>
                        }
                        aria-describedby="search-helper-text"
                        inputProps={{ 'aria-label': 'weight' }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
