import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Grid } from '@mui/material';
import Footer from '@/components/public/Footer';

export default function IndexPage(){
  return (
    <>
      <Head>
        <title>NetWatch Pro</title>
      </Head>
      <HeaderMenu/>
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
          <br/>
          <br/>
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
