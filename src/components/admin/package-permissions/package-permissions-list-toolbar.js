import {
  Box,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function PackagePermissionsListToolbar(props){
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
          {t('package_permissions')}
        </Typography>
      </Box>
    </Box>
  )
}
