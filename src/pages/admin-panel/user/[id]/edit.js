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

function UserIDEditPage({id}){
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
  const [password, setPassword] = useState("")
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

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'username': username,
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'disabled': (!disabled) ? "False": "True"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'users/' + id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           if (password){
             savePassword()
           }
           router.push("/admin-panel/user/" + id).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  function savePassword(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'password': password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'users/change-password/' + id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
         })
         .catch((error) => {
           console.log(error);
         });
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
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <TextField
                    label={t('password')}
                    value={password}
                    type="password"
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <FormControlLabel control={
                    <Checkbox checked={!disabled} onChange={(e) => setDisabled(e.target.checked)}/>
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
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <Button
                    variant={'contained'}
                    fullWidth={true}
                    onClick={onSaveClick}
                  >
                    {t('save')}
                  </Button>
                </Grid>
              </>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function UserIDEdit(){
  const router = useRouter()
  const {id} = router.query
  return <UserIDEditPage id={id}/>
}

UserIDEdit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UserIDEdit

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
