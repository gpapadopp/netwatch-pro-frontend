import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '@/components/public/Footer';

export default function AboutAppIndexPage(){
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('about_application')} | NetWatch Pro</title>
      </Head>
      <HeaderMenu/>
      <Grid
        container={true}
        spacing={0}
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000000"
        }}
      >
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Typography
            variant={'h5'}
            color={'#FFFFFF'}
            fontSize={56}
            fontWeight={'bold'}
            style={{
              position: 'absolute',
              marginTop: "-2%",
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: "center"
            }}
          >
            {t('about_application')}
          </Typography>
          <br/>
          <br/>
          <br/>
          <br/>
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={2}
      >
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <br/>
          <br/>
          <br/>
        </Grid>
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
        <Grid
          item={true}
          md={10}
          xs={10}
        >
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('about_app_content_first_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('about_app_content_second_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('about_app_content_third_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('about_app_content_fourth_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('about_app_content_fifth_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('sincerely')}
            <br/>
            {t('the_netwatch_pro_team')}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <br/>
          <br/>
          <br/>
        </Grid>
      </Grid>
      <Footer/>
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
