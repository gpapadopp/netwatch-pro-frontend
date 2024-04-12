import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress } from '@mui/material';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import getConfig from 'next/config';
import NotificationsListToolbar from '@/components/admin/notifications/notifications-list-toolbar';
import NotificationsListResults from '@/components/admin/notifications/notifications-list-results';

export default function NotificationsIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [allNotifications, setAllNotifications] = useState([])

  function getNotifications(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'notifications/',
      headers: {}
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllNotifications(allResponse['notifications'])
           setDisplayLoading(false)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  useEffect(() => {
    if (typeof window != "undefined"){
      if (firstLoad){
        getNotifications(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('notifications')} | NetWatch Pro
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
              <NotificationsListToolbar />
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
                  <NotificationsListResults
                    key={1}
                    allNotifications={allNotifications}
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

NotificationsIndexPage.getLayout = (page) => (
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
