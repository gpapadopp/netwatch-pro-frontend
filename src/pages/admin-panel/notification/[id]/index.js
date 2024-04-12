import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import Head from 'next/head';
import {
  Box,
  Button, Checkbox,
  Container,
  Divider, FormControlLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import * as React from 'react';

function NotificationIDPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [disabled, setDisabled] = useState("")
  const [createdAt, setCreatedAt] = useState("")

  const bannerURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/notifications/get-banner/" + id : 'https://arctouros.ict.ihu.gr/api/v1/api/notifications/get-banner/' + id

  function getNotification(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'notifications/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setTitle(allResponse["notification"]["title"])
           setContent(allResponse["notification"]["context"])
           setDisabled(allResponse["notification"]["disabled"])
           setCreatedAt(allResponse["notification"]["created_at"])
           setDisplayLoading(false)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  useEffect(() => {
    if (typeof window !== "undefined"){
      if (id !== undefined){
        if (firstLoad){
          getNotification()
          setFirstLoad(false)
        }
      }
    }
  }, []);

  function formatDateTime(dateToFormat){
    const parsedDate = moment.utc(dateToFormat).local()
    return parsedDate.format("DD/MM/YYYY HH:mm:ss")
  }

  return (
    <>
      <Head>
        <title>
          {id} | NetWatch Pro
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
              align={'center'}
            >
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                {t('notification_details')}
              </Typography>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
              align={'center'}
            >
              <Button
                variant={"contained"}
                onClick={() => router.push('/admin-panel/notification/' + id + "/edit")}
              >
                {t('edit_notification')}
              </Button>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <br/>
              <Divider/>
              <br/>
            </Grid>
            {displayLoading &&
              <>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <LinearProgress/>
                </Grid>
              </>
            }
            {!displayLoading &&
              <>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                  textAlign={'center'}
                >
                  <img src={bannerURL} alt={title} width={'35%'} />
                </Grid>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <TextField
                    label={'ID'}
                    value={id}
                    required={true}
                    fullWidth={true}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <TextField
                    label={t('notification_title')}
                    value={title}
                    required={true}
                    fullWidth={true}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <TextField
                    label={t('notification_content')}
                    value={content}
                    multiline={true}
                    minRows={4}
                    required={true}
                    fullWidth={true}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <TextField
                    label={t('created_at')}
                    value={formatDateTime(createdAt)}
                    required={true}
                    fullWidth={true}
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <FormControlLabel control={
                    <Checkbox checked={!disabled} disabled={true} />
                  } label={t('is_enabled')} />
                </Grid>
              </>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function NotificationID(){
  const router = useRouter()
  const {id} = router.query
  return <NotificationIDPage id={id}/>
}

NotificationID.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default NotificationID

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } }
    ],
    fallback: true
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
