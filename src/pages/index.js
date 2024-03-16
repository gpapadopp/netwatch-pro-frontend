import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function IndexPage(){
  return (
    <>
      <Head>
        <title>NetWatch Pro</title>
      </Head>
      <HeaderMenu/>
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
