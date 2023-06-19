import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

import DocumentListEntry from './DocumentsListEntry';

// redux types
import { GET_DOCUMENTS } from '../../../../store/actions';

// api
import { getDocuments } from '../../../../api/documentsAPI';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const documents = useSelector((state) => state.user.documents);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDocuments();

                if (response.success) {
                    dispatch({ type: GET_DOCUMENTS, data: response.documents });
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(documents);
    }, [documents]);

    const renderDocuments = () => {
        if (documents) {
            return documents.map((document) => {
                return <DocumentListEntry item={document} key={document._id} />;
            });
        }
    };

    return (
        <>
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                Documents
            </Typography>
            {renderDocuments()}
        </>
    );
};

export default NavItem;
