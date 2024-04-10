import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountPopover } from './account-popover';
import { useTranslation } from 'next-i18next';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { t } = useTranslation('common')
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  function getUserName(){
    const decodedUser = jwtDecode(cookies.user_jwt)
    return decodedUser["first_name"] + " " + decodedUser["last_name"]
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant={'span'}
            color={'black'}
            ref={settingsRef}
            onClick={() => setOpenAccountPopover(true)}
            style={{cursor: "pointer"}}
          >
            {t('welcome_back')}, <i><b>{getUserName()}</b></i>
          </Typography>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
