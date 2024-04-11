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
import moment from 'moment';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function BlogPostIDAddPage(){
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = new FormData();
    data.append('post_content', postContent);
    data.append('post_title', postTitle);
    data.append('disabled', (disabled) ? "True": "False");
    data.append('post_banner', selectedBanner);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           const createdID = allResponse["blog_post"]["id"].toString()
           router.push("/admin-panel/blog-post/" + createdID).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <>
      <Head>
        <title>
          {t('add_blog_post')} | NetWatch Pro
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
                value={""}
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
                minRows={3}
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
              <FormControlLabel control={
                <Checkbox checked={!disabled} onClick={(e) => setDisabled(e.target.checked)} />
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

BlogPostIDAddPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
