import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '@/components/public/Footer';

export default function TermsOfUseIndexPage(){
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('terms_of_use')} | NetWatch Pro</title>
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
            {t('terms_of_use')}
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
            {t('terms_of_use_intro_paragraph')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('acceptance_of_terms')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('acceptance_of_terms_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('app_description')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('app_description_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('user_responsibilities')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('user_responsibilities_content_one')}
            <br/>
            {t('user_responsibilities_content_two')}
            <br/>
            {t('user_responsibilities_content_three')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('use_restrictions')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('you_agree_not_to')}:
            <br/>
            {t('use_restrictions_content_one')}
            <br/>
            {t('use_restrictions_content_two')}
            <br/>
            {t('use_restrictions_content_three')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('intellectual_property')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('intellectual_property_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('disclaimer_of_warranty')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('disclaimer_of_warranty_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('limitation_of_liability')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('limitation_of_liability_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('changes_to_terms')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('changes_to_terms_content')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
          >
            {t('governing_law')}
          </Typography>
          <br/>
          <Typography
            variant={'h6'}
            fontWeight={'normal'}
          >
            {t('governing_law_content')}
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
            {t('terms_of_use_footer_content_one')}
            <br/>
            {t('terms_of_use_footer_content_two')}
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
