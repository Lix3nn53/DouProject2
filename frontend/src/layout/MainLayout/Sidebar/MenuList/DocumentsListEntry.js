import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconFile } from '@tabler/icons';

// redux types
import { SELECT_DOCUMENT } from '../../../../store/actions';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const selected = useSelector((state) => state.user.selectedDocument === item._id);

    const Icon = IconFile;

    const itemHandler = () => {
        dispatch({ type: SELECT_DOCUMENT, data: item._id });
    };

    // active menu item on page load
    useEffect(() => {}, []);

    return (
        <ListItemButton
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                py: 1.25,
                pl: `24px`
            }}
            selected={selected}
            onClick={() => itemHandler()}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: 36 }}>
                <Icon stroke={1.5} size="1.3rem" />
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === 1) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    selected: PropTypes.bool
};

export default NavItem;
