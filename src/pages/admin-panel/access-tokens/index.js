import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress } from '@mui/material';
import AccessTokensListToolbar from '@/components/admin/access-tokens/access-tokens-list-toolbar';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import AccessTokensListResults from '@/components/admin/access-tokens/access-tokens-list-results';

export default function AccessTokensIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [allAccessToken, setAllAccessTokens] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [allResults, setAllResults] = useState(0)

  function getAccessTokens(page, limit){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'access-tokens/?page=' + page + '&limit=' + limit,
      headers: {
        "Authorization": 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllAccessTokens(allResponse['all_access_tokens'])
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
        getAccessTokens(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onPageChange(newPage){
    setCurrentPage(newPage)
    setDisplayLoading(true)
    getAccessTokens(currentLimit, newPage)
  }

  function onLimitChange(newLimit){
    setCurrentLimit(newLimit)
    setDisplayLoading(true)
    getAccessTokens(newLimit, currentPage)
  }

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('access_tokens')} | NetWatch Pro
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
              <AccessTokensListToolbar />
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
                  <AccessTokensListResults
                    key={1}
                    allAccessTokens={allAccessToken}
                    totalResults={allResults}
                    page={currentPage}
                    onPageChange={onPageChange}
                    limit={currentLimit}
                    onLimitChange={onLimitChange}
                    refreshData={onRefreshData}
                  />
                </>
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

AccessTokensIndexPage.getLayout = (page) => (
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
