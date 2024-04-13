import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'next-i18next';
import { Grid, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';

export default function AddCsvFileSignaturesDialog({onSave, onClose}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [selectedFile, setSelectedFile] = useState(null)
  const [displayLoading, setDisplayLoading] = useState(false)

  function onSaveClick(){
    if (selectedFile === null){
      return
    }
    setDisplayLoading(true)
    const axios = require('axios');
    const FormData = require('form-data');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'
    let data = new FormData();
    data.append('csv_file', selectedFile);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'malicious-files-signatures/add-csv',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_jwt
      },
      data : data
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           onSave.call(this)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('add_with_csv')}
      </DialogTitle>
      <DialogContent>
        <Grid
          container={true}
          spacing={2}
        >
          <Grid
            item={true}
            md={12}
            xs={12}
          >
            <input type={'file'} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => setSelectedFile(e.target.files[0])}/>
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close')}</Button>
        <Button onClick={onSaveClick} autoFocus>
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
