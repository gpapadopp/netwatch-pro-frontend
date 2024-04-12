import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'next-i18next';

export default function DeleteInternetPackageDialog({onSave, onClose, internetPackageID}){
  const { t } = useTranslation('common')

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('delete_internet_package')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('are_you_sure_you_want_to_delete_the_internet_package_with_id')} &apos;<b>{internetPackageID}</b>&apos; ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('no')}</Button>
        <Button onClick={onSave} autoFocus>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
