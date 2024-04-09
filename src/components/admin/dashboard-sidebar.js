import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AndroidIcon from '@mui/icons-material/Android';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import { NavItem } from './nav-item';
import { useTranslation } from 'next-i18next';

export const DashboardSidebar = (props) => {
  const { t } = useTranslation('common')
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const items = [
    {
      href: '/',
      icon: (<ChartBarIcon fontSize="small" />),
      title: t('admin_panel')
    },
    {
      href: '/access-tokens|*&*|/access-token/[id]|*&*|/access-token/[id]/edit|*&*|/access-token/add',
      icon: (<VpnKeyIcon fontSize="small" />),
      title: t('access_tokens')
    },
    {
      href: '/blog-posts|*&*|/blog-post/[id]|*&*|/blog-post/[id]/edit|*&*|/blog-post/add',
      icon: (<RssFeedIcon fontSize="small" />),
      title: t('blog_posts')
    },
    {
      href: '/internet-packages|*&*|/internet-package/[id]|*&*|/internet-package/[id]/edit|*&*|/internet-package/add',
      icon: (<SyncAltIcon fontSize="small" />),
      title: t('internet_packages')
    },
    {
      href: '/malicious-files-signatures|*&*|malicious-files-signature/[id]|*&*|malicious-files-signature/[id]/edit|*&*|malicious-files-signature/add',
      icon: (<DescriptionIcon fontSize="small" />),
      title: t('malicious_files_signatures')
    },
    {
      href: '/notifications|*&*|/notification/[id]|*&*|notification/[id]/edit|*&*|/notification/add',
      icon: (<NotificationsIcon fontSize="small" />),
      title: t('notifications')
    },
    {
      href: '/package-apks|*&*|/package-apk/[id]|*&*|//package-apk/[id]/edit|*&*|/package-apk/add',
      icon: (<AndroidIcon fontSize="small" />),
      title: t('package_apks')
    },
    {
      href: '/package-permissions|*&*|/package-permission/[id]|*&*|/package-permission/[id]/edit|*&*|/package-permission/add',
      icon: (<BadgeIcon fontSize="small" />),
      title: t('package_permissions')
    },
    {
      href: '/users|*&*|/user/[id]|*&*|/user/[id]/edit|*&*|/user/add',
      icon: (<GroupIcon fontSize="small" />),
      title: t('users')
    }
  ];

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <NextLink
              href="/"
              passHref
            >
              <img src={'/static/app_logo_globe_removed_bg.png'} width={'45%'}
                   style={{ textAlign: 'center', display: 'block', margin: 'auto' }}
                   alt={'App Logo'}/>
            </NextLink>
            <br/>
            <NextLink href={"/"}>
              <Typography
                variant={'h6'}
              >
                NetWatch Pro
              </Typography>
            </NextLink>
            <Typography
              variant={'span'}
            >
              {t('admin_panel')}
            </Typography>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
