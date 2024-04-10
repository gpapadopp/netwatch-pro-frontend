import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Download as DownloadIcon } from '../../../icons/download';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function AccessTokensListToolbar(props){
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
          {t('access_tokens')}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin-panel/access-token/add")}
          >
            {t('add_access_token')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
