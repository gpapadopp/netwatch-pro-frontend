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
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';

function NotificationAddPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [disabled, setDisabled] = useState("")
  const [selectedBanner, setSelectedBanner] = useState(null)

  function onSaveClick(){
    const axios = require('axios');
    const FormData = require('form-data');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = new FormData();
    data.append('title', title);
    data.append('context', content);
    data.append('disabled', (disabled) ? "True": "False");
    data.append('banner', selectedBanner);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'notifications/add',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           const createdID = allResponse["notification"]["id"]
           router.push("/admin-panel/notification/" + createdID).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <>
      <Head>
        <title>
          {t('add_notification')} | NetWatch Pro
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
            >
              <br/>
              <Divider/>
              <br/>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <input type="file" accept="image/*"
                     onChange={(e) => setSelectedBanner(e.target.files[0])}/>
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <FormControlLabel control={
                <Checkbox checked={!disabled} onChange={(e) => setDisabled(e.target.checked)} />
              } label={t('is_enabled')} />
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <Button
                variant={'contained'}
                fullWidth={true}
                onClick={onSaveClick}
              >
                {t('save')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

NotificationAddPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default NotificationAddPage
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
