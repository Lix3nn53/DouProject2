// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/logo.svg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={logo} alt="Berry" width="100" height={'50px'} />;
};

export default Logo;
