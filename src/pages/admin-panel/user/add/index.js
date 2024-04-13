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
  Button, Checkbox,
  Container,
  Divider, FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';

function UserAddPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(false)

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'username': username,
      'password': password,
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'disabled': (!disabled) ? "True": "False"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'users/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           const createdID = allResponse['user']['id']
           router.push('/admin-panel/user/' + createdID).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <>
      <Head>
        <title>
          {t('add_user')} | NetWatch Pro
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
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <TextField
                label={'ID'}
                value={""}
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
              md={12}
              xs={12}
            >
              <FormControlLabel control={
                <Checkbox checked={!disabled} onChange={(e) => setDisabled(e.target.checked)}/>
              } label={t('is_enabled')} />
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
          </Grid>
        </Container>
      </Box>
    </>
  )
}

UserAddPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UserAddPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
