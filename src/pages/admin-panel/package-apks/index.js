import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import PackageApksListToolbar from '@/components/admin/package-apks/package-apks-list-toolbar';
import PackageApksListResults from '@/components/admin/package-apks/package-apks-list-results';

export default function PackageAPKsIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [allPackageAPKs, setAllPackageAPKs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [allResults, setAllResults] = useState(0)

  function getPackageAPKs(page, limit){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'package-apks/?page=' + page + '&limit=' + limit,
      headers: {
        "Authorization": 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllPackageAPKs(allResponse['all_package_apks'])
           setAllResults(allResponse['total_results'])
           setDisplayLoading(false)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  useEffect(() => {
    if (typeof window != "undefined"){
      if (firstLoad){
        getPackageAPKs(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onPageChange(newPage){
    setCurrentPage(newPage)
    setDisplayLoading(true)
    getPackageAPKs(newPage, currentLimit)
  }

  function onLimitChange(newLimit){
    setCurrentLimit(newLimit)
    setDisplayLoading(true)
    getPackageAPKs(currentPage, newLimit)
  }

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('package_apks')} | NetWatch Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <PackageApksListToolbar />
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <Divider/>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              {(displayLoading) &&
                <>
                  <LinearProgress/>
                </>
              }
              {(!displayLoading) &&
                <>
                {(allPackageAPKs.length === 0) &&
                  <>
                    <Typography
                      textAlign={'center'}
                      variant={'h6'}
                    >
                      {t('there_is_no_package_apks')}
                    </Typography>
                  </>
                }
                {(allPackageAPKs.length !== 0) &&
                  <>
                    <PackageApksListResults
                      key={1}
                      allPackageAPKs={allPackageAPKs}
                      totalResults={allResults}
                      page={currentPage}
                      onPageChange={onPageChange}
                      limit={currentLimit}
                      onLimitChange={onLimitChange}
                      refreshData={onRefreshData}
                    />
                  </>
                }
                </>
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

PackageAPKsIndexPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
