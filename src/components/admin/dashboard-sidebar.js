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
      href: '/admin-panel',
      icon: (<ChartBarIcon fontSize="small" />),
      title: t('admin_panel')
    },
    {
      href: '/admin-panel/access-tokens|*&*|/admin-panel/access-token/[id]|*&*|/admin-panel/access-token/[id]/edit|*&*|/admin-panel/access-token/add',
      icon: (<VpnKeyIcon fontSize="small" />),
      title: t('access_tokens')
    },
    {
      href: '/admin-panel/blog-posts|*&*|/admin-panel/blog-post/[id]|*&*|/admin-panel/blog-post/[id]/edit|*&*|/admin-panel/blog-post/add',
      icon: (<RssFeedIcon fontSize="small" />),
      title: t('blog_posts')
    },
    {
      href: '/admin-panel/internet-packages|*&*|/admin-panel/internet-package/[id]|*&*|/admin-panel/internet-package/[id]/edit|*&*|/admin-panel/internet-package/add',
      icon: (<SyncAltIcon fontSize="small" />),
      title: t('internet_packages')
    },
    {
      href: '/admin-panel/malicious-files-signatures|*&*|/admin-panel/malicious-files-signature/[id]|*&*|/admin-panel/malicious-files-signature/[id]/edit|*&*|/admin-panel/malicious-files-signature/add',
      icon: (<DescriptionIcon fontSize="small" />),
      title: t('malicious_files_signatures')
    },
    {
      href: '/admin-panel/notifications|*&*|/admin-panel/notification/[id]|*&*|/admin-panel/notification/[id]/edit|*&*|/admin-panel/notification/add',
      icon: (<NotificationsIcon fontSize="small" />),
      title: t('notifications')
    },
    {
      href: '/admin-panel/package-apks|*&*|/admin-panel/package-apk/[id]|*&*|/admin-panel/package-apk/[id]/edit|*&*|/admin-panel/package-apk/add',
      icon: (<AndroidIcon fontSize="small" />),
      title: t('package_apks')
    },
    {
      href: '/admin-panel/package-permissions|*&*|/admin-panel/package-permission/[id]|*&*|/admin-panel/package-permission/[id]/edit|*&*|/admin-panel/package-permission/add',
      icon: (<BadgeIcon fontSize="small" />),
      title: t('package_permissions')
    },
    {
      href: '/admin-panel/users|*&*|/admin-panel/user/[id]|*&*|/admin-panel/user/[id]/edit|*&*|/admin-panel/user/add',
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
