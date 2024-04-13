import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Lottie from 'react-lottie';
import * as lottie_animation from '/public/animations/404_lottie_animation.json'

export default function Page404(){
  const { t } = useTranslation('common')

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Head>
        <title>
          404 | NetWatch Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="md">
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              lg={12}
              md={12}
              xs={12}
            >
              <Typography
                align="center"
                color="textPrimary"
                variant="h1"
              >
                404: {t('the_page_you_are_looking_is_not_there')}
              </Typography>
            </Grid>
            <Grid
              item={true}
              ls={12}
              md={12}
              xs={12}
            >
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                {t('you_either_tried_some_shady_route')}
              </Typography>
            </Grid>
            <Grid
              item={true}
              lg={12}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <NextLink
                href="/admin-panel"
                passHref
              >
                <Button
                  component="a"
                  startIcon={(<ArrowBackIcon fontSize="small" />)}
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  {t('go_to_home_page')}
                </Button>
              </NextLink>
            </Grid>
            <Grid
              item={true}
              lg={12}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <Lottie options={defaultOptions}
                      height={400}
                      width={400}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
