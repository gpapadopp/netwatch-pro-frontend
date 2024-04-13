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

function PackagePermissionIDPage({id}){
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
  const [accessTokenID, setAccessTokenID] = useState("")

  const [issuer, setIssuer] = useState("")
  const [purpose, setPurpose] = useState("")

  function getBlogPost(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'package-permissions/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setDeviceID(allResponse["package_permissions"]["device_token"])
           setPackageName(allResponse["package_permissions"]["package_name"])
           setAppName(allResponse["package_permissions"]["app_name"])
           setCreatedAt(allResponse["package_permissions"]["created_at"])
           setIsMalware((allResponse["package_permissions"]["is_malware"] === 1))
           setAccessTokenID(allResponse["package_permissions"]["access_token_id"])
           setIssuer(allResponse["package_permissions"]["access_token_details"]['issuer'])
           setPurpose(allResponse["package_permissions"]["access_token_details"]['purpose'])
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
                {t('package_permission_details')}
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
                onClick={() => router.push('/admin-panel/package-permission/' + id + "/edit")}
              >
                {t('edit_package_permission')}
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
                  textAlign={'center'}
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

function PackagePermissionID(){
  const router = useRouter()
  const {id} = router.query
  return <PackagePermissionIDPage id={id}/>
}

PackagePermissionID.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default PackagePermissionID

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
