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

function UserIDPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [createdAt, setCreatedAt] = useState("")

  function getBlogPost(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'users/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setFirstName(allResponse['user_details']['first_name'])
           setLastName(allResponse['user_details']['last_name'])
           setEmail(allResponse['user_details']['email'])
           setUsername(allResponse['user_details']['username'])
           setDisabled(allResponse['user_details']['disabled'])
           setCreatedAt(allResponse["package_permissions"]["created_at"])
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
                {t('user_details')}
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
                onClick={() => router.push('/admin-panel/user/' + id + "/edit")}
              >
                {t('edit_user')}
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
                  md={6}
                  xs={6}
                >
                  <TextField
                    label={t('first_name')}
                    value={firstName}
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
                    label={t('last_name')}
                    value={lastName}
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
                    label={t('username')}
                    value={username}
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
                    label={t('email_address')}
                    value={email}
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
              </>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function UserID(){
  const router = useRouter()
  const {id} = router.query
  return <UserIDPage id={id}/>
}

UserID.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UserID

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
