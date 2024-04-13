import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import PackagePermissionsListToolbar
  from '@/components/admin/package-permissions/package-permissions-list-toolbar';
import PackagePermissionsListResults
  from '@/components/admin/package-permissions/package-permissions-list-results';

export default function PackagePermissionsIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [allPackagePermissions, setAllPackagePermissions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [allResults, setAllResults] = useState(0)

  function getPackagePermissions(page, limit){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'package-permissions/?page=' + page + '&limit=' + limit,
      headers: {
        "Authorization": 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllPackagePermissions(allResponse['all_package_permissions'])
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
        getPackagePermissions(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onPageChange(newPage){
    setCurrentPage(newPage)
    setDisplayLoading(true)
    getPackagePermissions(newPage, currentLimit)
  }

  function onLimitChange(newLimit){
    setCurrentLimit(newLimit)
    setDisplayLoading(true)
    getPackagePermissions(currentPage, newLimit)
  }

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('package_permissions')} | NetWatch Pro
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
              <PackagePermissionsListToolbar />
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
                {(allPackagePermissions.length === 0) &&
                  <>
                    <Typography
                      textAlign={'center'}
                      variant={'h6'}
                    >
                      {t('there_is_no_package_permissions')}
                    </Typography>
                  </>
                }
                {(allPackagePermissions.length !== 0) &&
                  <>
                    <PackagePermissionsListResults
                      key={1}
                      allPackagePermissions={allPackagePermissions}
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

PackagePermissionsIndexPage.getLayout = (page) => (
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
