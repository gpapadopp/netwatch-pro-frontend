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
import * as React from 'react';

function MaliciousFileSignatureIDEditPage({id}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)

  const [fileSignature, setFileSignature] = useState("")
  const [fileType, setFileType] = useState("")
  const [fileCategory, setFileCategory] = useState("")

  function getMaliciousFileSignature(){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'malicious-files-signatures/' + id,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setFileSignature(allResponse['malicious_file_signature']['file_signature'])
           setFileType(allResponse['malicious_file_signature']['file_signature_type'])
           setFileCategory(allResponse['malicious_file_signature']['file_category'])
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
          getMaliciousFileSignature()
          setFirstLoad(false)
        }
      }
    }
  }, []);

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'file_signature': fileSignature,
      'file_signature_type': fileType,
      'file_category': fileCategory
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'malicious-files-signatures/' + id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           router.push("/admin-panel/malicious-file-signature/" + id).then()
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
                {t('malicious_file_signature_details')}
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
                  md={12}
                  xs={12}
                >
                  <TextField
                    label={t('file_signature')}
                    value={fileSignature}
                    multiline={true}
                    minRows={4}
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setFileSignature(e.target.value)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <TextField
                    label={t('file_signature_type')}
                    value={fileType}
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setFileType(e.target.value)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={6}
                  xs={6}
                >
                  <TextField
                    label={t('file_type')}
                    value={fileCategory}
                    required={true}
                    fullWidth={true}
                    onChange={(e) => setFileCategory(e.target.value)}
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

function MaliciousFileSignatureIDEdit(){
  const router = useRouter()
  const {id} = router.query
  return <MaliciousFileSignatureIDEditPage id={id}/>
}

MaliciousFileSignatureIDEdit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MaliciousFileSignatureIDEdit

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
