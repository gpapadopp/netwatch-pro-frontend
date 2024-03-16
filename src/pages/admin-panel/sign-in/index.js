import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, LinearProgress, Tab, Tabs, TextField, Typography } from '@mui/material';
import { auth, ENABLE_AUTH } from '@/lib/auth';
import { Logo } from '@/components/admin/logo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function LoginPage(){
  const { t } = useTranslation('common')
  const [tab, setTab] = useState('email');
  const [displayLoading, setDisplayLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: "",
      username: "",
      submit: null
    },
    validationSchema: Yup.object((tab === "email") ? {
      email: Yup
        .string()
        .email(t('must_be_a_valid_email'))
        .max(255)
        .required(t('email_is_required')),
      password: Yup
        .string()
        .max(255)
        .required(t('password_is_required'))
    }: {
      email: Yup
        .string()
        .max(255)
        .required(t('username_is_required')),
      password: Yup
        .string()
        .max(255)
        .required(t('password_is_required'))
    }),
    onSubmit: async (values, helpers) => {
      setDisplayLoading(true)
      // if (!ENABLE_AUTH) {
      //   helpers.setFieldError('submit', 'Zalter authentication not enabled');
      //   helpers.setSubmitting(false);
      //   return;
      // }
      //
      // try {
      //   // When in development, this will be 'http://localhost:3000/sign-in/confirm'
      //   // Remember to configure it in your project settings
      //   const redirectUri = window.location.href + '/confirm';
      //
      //   // This can be call inside AuthProvider component, but we do it here for simplicity
      //   await auth.signInWithLink('start', {
      //     email: values.email,
      //     redirectUri
      //   });
      //   helpers.setSubmitting(false);
      //   setEmailSent(true);
      // } catch (err) {
      //   console.error(err);
      //   helpers.setFieldError('submit', err.message || 'Something went wrong');
      //   helpers.setSubmitting(false);
      // }
    }
  });

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <>
      <Head>
        <title>{t('login')} | NetWatch Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto'
        }}
      >
        <Grid
          container
          sx={{ flex: '1 1 auto' }}
        >
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: 'neutral.50',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                p: 3
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box
              sx={{
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}
              >
                <Typography
                  sx={{ mb: 1 }}
                  variant="h4"
                >
                  {t('welcome')}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                  variant="body2"
                >
                  {t('login_to_have_access_to_the_administration_panel')}
                </Typography>
                <Tabs
                  onChange={handleTabChange}
                  sx={{ mb: 3 }}
                  value={tab}
                >
                  <Tab
                    label="Email"
                    value="email"
                  />
                  <Tab
                    label={t('username')}
                    value="username"
                  />
                </Tabs>
                {tab === 'email' && (
                  <div>
                    <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label={t('email_address')}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      variant="outlined"
                    />
                    <br/>
                    <br/>
                    <TextField
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label={t('password')}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      variant="outlined"
                    />
                    {formik.errors.submit && (
                      <Typography
                        color="error"
                        sx={{ mt: 2 }}
                        variant="body2"
                      >
                        {formik.errors.submit}
                      </Typography>
                    )}
                  </div>
                )}
                {tab === 'username' && (
                  <div>
                    <TextField
                      error={Boolean(formik.touched.username && formik.errors.username)}
                      fullWidth
                      helperText={formik.touched.username && formik.errors.username}
                      label={t('username')}
                      name="username"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.username}
                      variant="outlined"
                    />
                    <br/>
                    <br/>
                    <TextField
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label={t('password')}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      variant="outlined"
                    />
                    {formik.errors.submit && (
                      <Typography
                        color="error"
                        sx={{ mt: 2 }}
                        variant="body2"
                      >
                        {formik.errors.submit}
                      </Typography>
                    )}
                  </div>
                )}
                {displayLoading &&
                  <>
                    <br/>
                    <LinearProgress/>
                    <br/>
                  </>
                }
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={() => formik.handleSubmit()}
                  variant="contained"
                  disabled={displayLoading}
                >
                  {t('login')}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: 'center',
              backgroundColor: "#000000",
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              '& img': {
                maxWidth: '100%'
              }
            }}
          >
            <Box sx={{ p: 3 }}>
              <img src={'/static/app_logo_globe.png'} width={'45%'} style={{textAlign: "center", display: "block", margin: "auto"}}/>
              <Typography
                align="center"
                sx={{ mb: 3 }}
                variant="subtitle1"
                fontSize={32}
              >
                NetWatch Pro
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
