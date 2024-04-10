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

export default function AccessTokenIDEditPage(){
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [issuer, setIssuer] = useState("")
  const [purpose, setPurpose] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [activeUntil, setActiveUntil] = useState("")
  const [accessModels, setAccessModels] = useState([])

  const allAccessModelEnum = [
    "internet_packages_model",
    "notifications_model",
    "package_apks_model",
    "package_permissions_model",
    "access_tokens_model"
  ]

  function formatDateTime(dateToFormat){
    const parsedDate = moment.utc(dateToFormat).local()
    return parsedDate.format("DD/MM/YYYY HH:mm:ss")
  }

  function getAccessModelValue(key){
    if (key === "internet_packages_model"){
      return t('internet_package_model')
    }
    if (key === "notifications_model"){
      return t('notifications_model')
    }
    if (key === "package_apks_model"){
      return t('package_apks_model')
    }
    if (key === "package_permissions_model"){
      return t('package_permissions_model')
    }
    if (key === "access_tokens_model"){
      return t('access_tokens_model')
    }
    return ""
  }

  function generateAccessModelsRequest(){
    let accessModelsToReturn = []
    for (let i = 0; i<accessModels.length; i++){
      if (accessModels[i] === "internet_packages_model"){
        accessModelsToReturn.push("InternetPackagesModel")
      } else if (accessModels[i] === "notifications_model"){
        accessModelsToReturn.push("Notifications")
      } else if (accessModels[i] === "package_apks_model"){
        accessModelsToReturn.push("PackageAPKsModel")
      } else if (accessModels[i] === "package_permissions_model"){
        accessModelsToReturn.push("PackagePermissionsModel")
      } else if (accessModels[i] === "access_tokens_model"){
        accessModelsToReturn.push("AccessTokensModel")
      }
    }
    return accessModelsToReturn
  }

  function onSaveClick(){
    const axios = require('axios');
    const qs = require('qs');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = qs.stringify({
      'issuer': issuer,
      'purpose': purpose,
      'access_models': generateAccessModelsRequest().join(",")
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'access-tokens/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           const createdID = allResponse["access_token"][0]["id"].toString()
           router.push("/admin-panel/access-token/" + createdID).then()
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <>
      <Head>
        <title>
          {t('add_access_token')} | NetWatch Pro
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
                label={t('issuer')}
                value={issuer}
                required={true}
                fullWidth={true}
                onChange={(e) => setIssuer(e.target.value)}
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
                onChange={(e) => setPurpose(e.target.value)}
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
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('active_since')}
                value={"-"}
                required={true}
                fullWidth={true}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('active_since')}
                value={"-"}
                required={true}
                fullWidth={true}
                onChange={(e) => setActiveUntil(e.target.value)}
              />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
            >
              <TextField
                label={t('api_key')}
                value={apiKey}
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
                label={t('secret_key')}
                value={secretKey}
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
              <FormControl fullWidth={true}>
                <InputLabel id="demo-multiple-chip-label">{t('access_models')}</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={accessModels}
                  onChange={(e) => setAccessModels(e.target.value)}
                  fullWidth={true}
                  input={<OutlinedInput id="select-multiple-chip" label={t('access_models')} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={getAccessModelValue(value)} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {allAccessModelEnum.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, getAccessModelValue(name), theme)}
                    >
                      {getAccessModelValue(name)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

AccessTokenIDEditPage.getLayout = (page) => (
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
