import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import getConfig from 'next/config';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import * as React from 'react';

function InternetPackageIDAddPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [deviceToken, setDeviceToken] = useState("")
  const [sourceIP, setSourceIP] = useState("")
  const [destinationIP, setDestinationIP] = useState("")
  const [sourceMacAddress, setSourceMacAddress] = useState("")
  const [destinationMacAddress, setDestinationMacAddress] = useState("")
  const [headerType, setHeaderType] = useState("")
  const [rawHeader, setRawHeader] = useState("")
  const [rawPayload, setRawPayload] = useState("")

  function formatDateTime(dateToFormat){
    const parsedDate = moment.utc(dateToFormat).local()
    return parsedDate.format("DD/MM/YYYY HH:mm:ss")
  }

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'device_token': deviceToken,
      'source_ip': sourceIP,
      'destination_id': destinationIP,
      'source_mac_address': sourceMacAddress,
      'destination_mac_address': destinationMacAddress,
      'header_type': headerType,
      'raw_header': rawHeader,
      'raw_payload': rawPayload
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'internet-packages/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           const createdID = allResponse['internet_package']["id"]
           router.push("/admin-panel/internet-package/" + createdID).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <>
      <Head>
        <title>
          {t('add_internet_package')} | NetWatch Pro
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
                {t('internet_package_details')}
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
                label={t('access_token')}
                value={deviceToken}
                required={true}
                fullWidth={true}
                onChange={(e) => setDeviceToken(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('source_ip')}
                value={sourceIP}
                required={true}
                fullWidth={true}
                onChange={(e) => setSourceIP(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('destination_ip')}
                value={destinationIP}
                required={true}
                fullWidth={true}
                onChange={(e) => setDestinationIP(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('source_mac_address')}
                value={sourceMacAddress}
                required={true}
                fullWidth={true}
                onChange={(e) => setSourceMacAddress(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('destination_mac_address')}
                value={destinationMacAddress}
                required={true}
                fullWidth={true}
                onChange={(e) => setDestinationMacAddress(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('header_type')}
                value={headerType}
                required={true}
                fullWidth={true}
                onChange={(e) => setHeaderType(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('raw_header')}
                value={rawHeader}
                multiline={true}
                minRows={4}
                required={true}
                fullWidth={true}
                onChange={(e) => setRawHeader(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <TextField
                label={t('raw_payload')}
                value={rawPayload}
                multiline={true}
                minRows={4}
                required={true}
                fullWidth={true}
                onChange={(e) => setRawPayload(e.target.value)}
              />
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

InternetPackageIDAddPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default InternetPackageIDAddPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
