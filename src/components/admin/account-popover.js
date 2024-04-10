import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

export const AccountPopover = (props) => {
  const { t } = useTranslation('common')
  const { anchorEl, onClose, open, ...other } = props;

  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const handleSignOut = async () => {
    onClose?.();

    removeCookie(cookies.user_jwt)
    router.push("/").then()
  };

  function getUserName(){
    const decodedUser = jwtDecode(cookies.user_jwt)
    return decodedUser["first_name"] + " " + decodedUser['last_name']
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          {t('user')}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {getUserName()}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
