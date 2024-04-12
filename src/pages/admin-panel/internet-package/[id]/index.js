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
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import * as React from 'react';

function InternetPackageIDPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [deviceToken, setDeviceToken] = useState("")
  const [sourceIP, setSourceIP] = useState("")
  const [destinationIP, setDestinationIP] = useState("")
  const [sourceMacAddress, setSourceMacAddress] = useState("")
  const [destinationMacAddress, setDestinationMacAddress] = useState("")
  const [headerType, setHeaderType] = useState("")
  const [rawHeader, setRawHeader] = useState("")
  const [rawPayload, setRawPayload] = useState("")
  const [createdAt, setCreatedAt] = useState("")

  const [issuer, setIssuer] = useState("")
  const [purpose, setPurpose] = useState("")
  const [accessTokenID, setAccessTokenID] = useState("")

  function getInternetPackage(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'internet-packages/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setDeviceToken(allResponse["internet_package"]["device_token"])
           setSourceIP(allResponse["internet_package"]["source_ip"])
           setDestinationIP(allResponse["internet_package"]["destination_ip"])
           setSourceMacAddress(allResponse["internet_package"]["source_mac_address"])
           setDestinationMacAddress(allResponse["internet_package"]["destination_mac_address"])
           setHeaderType(allResponse["internet_package"]["header_type"])
           setRawHeader(allResponse["internet_package"]["raw_header"])
           setRawPayload(allResponse["internet_package"]["raw_payload"])
           setCreatedAt(allResponse["internet_package"]["created_at"])
           setAccessTokenID(allResponse["internet_package"]["access_token_id"])

           setIssuer(allResponse["internet_package"]["access_token_details"]['issuer'])
           setPurpose(allResponse["internet_package"]["access_token_details"]['purpose'])

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
          getInternetPackage()
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
                {t('internet_package_details')}
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
                onClick={() => router.push('/admin-panel/internet-package/' + id + "/edit")}
              >
                {t('edit_internet_package_details')}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
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
                  md={12}
                  xs={12}
                  textAlign={'center'}c
                >
                  <br/>
                  <Divider/>
                  <br/>
                  <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                  >
                    {t('access_token_details')}
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
                    label={t('access_token')}
                    value={accessTokenID}
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
                    label={t('issuer')}
                    value={issuer}
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
                    label={t('purpose')}
                    value={purpose}
                    required={true}
                    fullWidth={true}
                    disabled={true}
                  />
                </Grid>
              </>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function InternetPackageID(){
  const router = useRouter()
  const {id} = router.query
  return <InternetPackageIDPage id={id}/>
}

InternetPackageID.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default InternetPackageID

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
