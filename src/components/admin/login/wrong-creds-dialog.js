import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useTranslation} from "next-i18next";

export default function LoginPageWrongCredsDialog({agreeClick}){
  const { t } = useTranslation();
  return (
    <div>
      <Dialog
        open={true}
        onClose={agreeClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('wrong_credentials')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('your_username_email_or_password_is_wrong')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={agreeClick} autoFocus>
            {t('ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
