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

function PackageAPKIDPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [deviceID, setDeviceID] = useState("")
  const [packageName, setPackageName] = useState("")
  const [appName, setAppName] = useState("")
  const [isMalware, setIsMalware] = useState(false)
  const [createdAt, setCreatedAt] = useState("")
  const [md5Checksum, setMd5Checksum] = useState("")
  const [accessTokenID, setAccessTokenID] = useState("")

  const [issuer, setIssuer] = useState("")
  const [purpose, setPurpose] = useState("")

  function getBlogPost(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'package-apks/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setDeviceID(allResponse["all_package_apks"]["device_token"])
           setPackageName(allResponse["all_package_apks"]["package_name"])
           setAppName(allResponse["all_package_apks"]["app_name"])
           setCreatedAt(allResponse["all_package_apks"]["created_at"])
           setIsMalware((allResponse["all_package_apks"]["is_malware"] === 1))
           setMd5Checksum(allResponse["all_package_apks"]["md5_checksum"])
           setAccessTokenID(allResponse["all_package_apks"]["access_token_id"])
           setIssuer(allResponse["all_package_apks"]["access_token_details"]['issuer'])
           setPurpose(allResponse["all_package_apks"]["access_token_details"]['purpose'])
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
          getBlogPost()
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
                {t('package_apk_details')}
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
                onClick={() => router.push('/admin-panel/package-apk/' + id + "/edit")}
              >
                {t('edit_package_apk')}
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
                    label={t('device_token')}
                    value={deviceID}
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
                    label={t('package_name')}
                    value={packageName}
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
                    label={t('app_name')}
                    value={appName}
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
                    label={t('is_malware')}
                    value={(isMalware) ? t('yes') : t("no")}
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
                    label={t('md5_checksum_apk')}
                    value={md5Checksum}
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

function PackageAPKID(){
  const router = useRouter()
  const {id} = router.query
  return <PackageAPKIDPage id={id}/>
}

PackageAPKID.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default PackageAPKID

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
