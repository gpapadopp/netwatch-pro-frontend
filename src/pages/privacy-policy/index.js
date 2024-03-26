import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '@/components/public/Footer';

export default function PrivacyPolicyIndexPage(){
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('privacy_policy')} | NetWatch Pro</title>
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
            {t('privacy_policy')}
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
            {t('privacy_policy_intro_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('information_we_collect')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            A.{t('personal_information')}
            <br/>
            {t('personal_information_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            B.{t('data_collected_for_app_functionality')}
            <br/>
            {t('data_collected_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('how_we_use_your_information')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('how_we_use_your_information_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('data_security')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('data_security_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('third_party_services')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('third_party_services_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('children_privacy')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('children_privacy_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('changes_to_this_privacy_policy')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('changes_to_this_privacy_policy_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('contact_information')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('contact_information_content')}
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
