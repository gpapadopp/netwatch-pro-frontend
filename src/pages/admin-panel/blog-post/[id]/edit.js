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

function BlogPostIDEditPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [createdAt, setCreatedAt] = useState("")

  const [selectedBanner, setSelectedBanner] = useState(null)

  function getBlogPost(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setPostTitle(allResponse["blog_post"]["post_title"])
           setPostContent(allResponse["blog_post"]["post_content"])
           setDisabled(allResponse["blog_post"]["disabled"])
           setCreatedAt(allResponse["blog_post"]["created_at"])
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
      'post_content': postContent,
      'post_title': postTitle,
      'disabled': (disabled) ? "True": "False",
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/' + id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           if (selectedBanner !== null){
             updateBanner()
           }
           router.push("/admin-panel/blog-post/" + id).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  function updateBanner(){
    const axios = require('axios');
    const FormData = require('form-data');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = new FormData();
    data.append('post_banner', selectedBanner);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/change-banner/' + id,
      headers: {
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
                {t('blog_post_details')}
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
                  textAlign={'center'}
                >
                  <input type="file" accept="image/*" onChange={(e) => setSelectedBanner(e.target.files[0])}/>
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
                    label={t('blog_post_title')}
                    value={postTitle}
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={12}
                  xs={12}
                >
                  <TextField
                    label={t('post_content')}
                    value={postContent}
                    multiline={true}
                    minRows={4}
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setPostContent(e.target.value)}
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
              </>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function AccessTokenIDEdit(){
  const router = useRouter()
  const {id} = router.query
  return <BlogPostIDEditPage id={id}/>
}

AccessTokenIDEdit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AccessTokenIDEdit

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
