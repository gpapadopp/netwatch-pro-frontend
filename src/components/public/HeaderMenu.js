import {
  AppBar,
  Box, Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar, Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import LoadingBar from 'react-top-loading-bar';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function HeaderMenu(){
  const { t } = useTranslation('common')
  const [anchorElNav, setAnchorElNav] = useState(null);
  const ref = useRef(null)
  const router = useRouter()
  const lang = router.locale

  const pages = [t('home_page'), 'Blog', t('about_application'), t('privacy_policy'), t('terms_of_use'), t('api_documentation')];
  const urls = ['/', '/blog', '/about', '/privacy-policy', '/terms-of-use', '/api-docs']

  useEffect(() => {
    const handleRouteChange = (url) => {
      //Started Transitioning
      ref.current.continuousStart();
    };

    const handleRouteChangeEnd = (url) => {
      //Ended Transitioning
      if (ref.current !== null) {
        ref.current.complete();
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  function handleButtonClick(index){
    setAnchorElNav(null);
    router.push(urls[index]).then()
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function changeLanguage(languageID){
    if (languageID === 1){
      //Change to Greek
      router.push(router.asPath, router.asPath, { locale: 'el' }).then()
      return;
    }
    //Change to English
    router.push(router.asPath, router.asPath, { locale: 'en' }).then()
  }

  return (
    <>
      <LoadingBar color='#FFFFFF' ref={ref}/>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'none', md: 'block' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                textAlign: 'center',
                width: "5%"
              }}
            >
              <NextLink href={"/"}>
                <Tooltip title={"NetWatch Pro"} placement={"top"}>
                  <img src={'/static/app_logo_globe_removed_bg.png'} width={'75%'} style={{textAlign: "center"}}/>
                </Tooltip>
              </NextLink>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'none', md: 'block' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              NetWatch Pro
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={() => handleButtonClick(index)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 15,
                display: { xs: 'block', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                textAlign: "center",
                width: "5%"
              }}
            >
              <Tooltip title={"NetWatch Pro"} placement={"top"}>
                <img src={'/static/app_logo_globe_removed_bg.png'} width={'75%'} style={{textAlign: "center"}}/>
              </Tooltip>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={() => handleButtonClick(index)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
              <Tooltip title={t('search')} placement={"top"}>
                <SearchIcon style={{marginTop: "1.6%", cursor: "pointer", marginRight: "1%"}}/>
              </Tooltip>
              {(lang === "en") &&
                <>
                  <Tooltip title={t('greek')} placement={"top"}>
                    <img src={'/static/languages/el.svg'} width={'2%'} style={{cursor: "pointer"}} onClick={() => changeLanguage(1)}/>
                  </Tooltip>
                </>
              }
              {(lang === "el") &&
                <>
                  <Tooltip title={t('english')} placement={"top"}>
                    <img src={'/static/languages/en.svg'} width={'2%'} style={{cursor: "pointer"}} onClick={() => changeLanguage(2)}/>
                  </Tooltip>
                </>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
