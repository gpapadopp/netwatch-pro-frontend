import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function MaliciousFilesSignaturesListToolbar(props){
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          {t('malicious_files_signatures')}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin-panel/malicious-files-signature/add")}
          >
            {t('add_malicious_file_signature')}
          </Button>
          &nbsp;
          <Button
            color="primary"
            variant="contained"
            onClick={props.openCsvDialog}
          >
            {t('add_with_csv')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
