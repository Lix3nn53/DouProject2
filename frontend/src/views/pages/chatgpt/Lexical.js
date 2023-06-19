import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SELECT_DOCUMENT, GET_DOCUMENTS } from '../../../store/actions';

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

// api
import { getDocument, updateDocument, getDocuments, deleteDocument } from '../../../api/documentsAPI';

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
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState(0);
    const innerRef = useRef(null);

    const [document, setDocument] = useState(null);

    useEffect(() => {
        setLoading(false);
        dispatch({ type: SELECT_DOCUMENT, data: id });

        const fetchData = async () => {
            try {
                const response = await getDocument(id);

                if (response.success) {
                    const doc = response.document;
                    setDocument(doc);

                    if (doc && doc.value && doc.value != null && doc.value !== '') {
                        console.log(doc.value);
                        setEditorState(doc.value);
                    }
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    function handleClick() {
        const a = innerRef.current.getSelectedNodeText();
        console.log('ref', a);
    }

    const getEditorState = () => {
        const state = innerRef.current.getEditorState();
        console.log('state', JSON.stringify(state));
    };

    const setEditorState = (editorStateJSONString) => {
        innerRef.current.setEditorState(editorStateJSONString);
    };

    const updateDocumentInner = async () => {
        const updatedObject = { ...document };
        updatedObject.title = updatedObject.title + 'B';
        updatedObject.value = innerRef.current.getEditorState();
        setDocument(updatedObject);

        try {
            const response = await updateDocument(updatedObject._id, updatedObject.title, updatedObject.value);

            if (response.success) {
                getDocuments().then((response) => {
                    if (response.success) {
                        dispatch({ type: GET_DOCUMENTS, data: response.documents });
                    }
                });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const deleteDocumentInner = async () => {
        try {
            const response = await deleteDocument(document._id);

            if (response.success) {
                getDocuments().then((response) => {
                    if (response.success) {
                        dispatch({ type: GET_DOCUMENTS, data: response.documents });
                    }
                });

                navigate('/');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const grammerCorrectionButton = () => {
        const value = innerRef.current.getSelectedNodeText();

        // Send to backend
        grammerCorrection(value).then((res) => {
            innerRef.current.setSelectedNodeText(res);
        });
    };

    const renderButtons = () => {
        switch (buttonState) {
            case 0:
                return (
                    <>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => setButtonState(1)}>
                                Edit or review selection {'>'}
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => setButtonState(2)}>
                                Generate from selection {'>'}
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => setButtonState(3)}>
                                Write with AI {'>'}
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => setButtonState(4)}>
                                Draft with AI {'>'}
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => updateDocumentInner()}>
                                Save Document
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={() => setEditorState()}>
                                Test Set State
                            </Button>
                        </Box>
                    </>
                );
            case 1:
                return (
                    <>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={grammerCorrectionButton}>
                                Improve writing
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
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
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="contained" onClick={() => setButtonState(0)}>
                                Back
                            </Button>
                        </Box>
                    </>
                );
            case 2:
                return (
                    <>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={grammerCorrectionButton}>
                                Summarize
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={grammerCorrectionButton}>
                                Translate {'>'}
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="outlined" onClick={grammerCorrectionButton}>
                                Explain this
                            </Button>
                        </Box>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="contained" onClick={() => setButtonState(0)}>
                                Back
                            </Button>
                        </Box>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button variant="outlined" onClick={handleClick}>
                            Change tone {'>'}
                        </Button>
                        <Button variant="outlined" onClick={handleClick}>
                            Simplify language
                        </Button>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="contained" onClick={() => setButtonState(0)}>
                                Back
                            </Button>
                        </Box>
                    </>
                );
            case 4:
                return (
                    <>
                        <Button variant="outlined" onClick={handleClick}>
                            Change tone {'>'}
                        </Button>
                        <Button variant="outlined" onClick={handleClick}>
                            Simplify language
                        </Button>
                        <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                            <Button variant="contained" onClick={() => setButtonState(0)}>
                                Back
                            </Button>
                        </Box>
                    </>
                );
            default:
                return null;
        }
    };

    const renderControlButtons = () => {
        return (
            <>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={updateDocumentInner}>
                        Save Document
                    </Button>
                </Box>
                <Box marginTop={'16px'} display={'flex'} flexDirection={'column'}>
                    <Button variant="outlined" onClick={deleteDocumentInner}>
                        Remove Document
                    </Button>
                </Box>
            </>
        );
    };

    const getTitle = () => {
        switch (buttonState) {
            case 0:
                return 'Select Category';
            case 1:
                return 'Ask AI';
            case 2:
                return 'Ask AI';
            case 3:
                return 'Ask AI';
            default:
                return 'Ask AI';
        }
    };

    return (
        <Grid container spacing={gridSpacing} flex={1} flexDirection={'row'} height={'100%'}>
            <Box flex={2} height={'100%'} display={'flex'}>
                <LexicalEditor ref={innerRef} />
            </Box>
            <Box
                flex={1}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                marginTop={'24px'}
                paddingBottom={'48px'}
                justifyContent={'space-between'}
            >
                <Box>
                    <Title>{getTitle()}</Title>
                    {renderButtons()}
                </Box>
                <Box>{renderControlButtons()}</Box>
            </Box>
        </Grid>
    );
};

export default Dashboard;
