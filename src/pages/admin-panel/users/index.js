import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import UsersListToolbar from '@/components/admin/users/users-list-toolbar';
import UsersListResults from '@/components/admin/users/users-list-results';

export default function UsersIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [allUsers, setAllUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [allResults, setAllResults] = useState(0)

  function getUsers(page, limit){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'users/?page=' + page + '&limit=' + limit,
      headers: {
        "Authorization": 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllUsers(allResponse['all_users'])
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
        getUsers(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onPageChange(newPage){
    setCurrentPage(newPage)
    setDisplayLoading(true)
    getUsers(newPage, currentLimit)
  }

  function onLimitChange(newLimit){
    setCurrentLimit(newLimit)
    setDisplayLoading(true)
    getUsers(currentPage, newLimit)
  }

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('users')} | NetWatch Pro
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
              <UsersListToolbar />
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
                {(allUsers.length === 0) &&
                  <>
                    <Typography
                      textAlign={'center'}
                      variant={'h6'}
                    >
                      {t('there_is_no_users')}
                    </Typography>
                  </>
                }
                {(allUsers.length !== 0) &&
                  <>
                    <UsersListResults
                      key={1}
                      allUsers={allUsers}
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

UsersIndexPage.getLayout = (page) => (
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
