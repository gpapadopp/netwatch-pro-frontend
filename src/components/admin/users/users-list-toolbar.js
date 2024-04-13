import {
  Box, Button,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function UsersListToolbar(props){
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
          {t('users')}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin-panel/users/add")}
          >
            {t('add_user')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
