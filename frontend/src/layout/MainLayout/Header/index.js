import PropTypes from 'prop-types';

// react
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Button } from '@mui/material';
import { shouldForwardProp } from '@mui/system';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const LoginButton = styled(Button, { shouldForwardProp })(({ theme }) => ({
    marginRight: '10px'
}));

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);

    const renderRightSection = () => {
        if (user.user != null) {
            return (
                <>
                    <ProfileSection />
                    <NotificationSection />
                </>
            );
        } else {
            return (
                <>
                    <LoginButton variant="outlined" component={Link} to="/pages/login">
                        Login
                    </LoginButton>
                    <Button variant="contained" component={Link} to="/pages/register">
                        Register
                    </Button>
                </>
            );
        }
    };

    const renderSideBarCollapse = () => {
        if (user.user != null) {
            return (
                <>
                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                </>
            );
        } else {
            return <></>;
        }
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {renderSideBarCollapse()}
            </Box>

            {/* header search */}
            <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {renderRightSection()}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
