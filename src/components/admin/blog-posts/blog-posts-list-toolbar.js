import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function BlogPostsListToolbar(props){
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
          {t('blog_posts')}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin-panel/blog-post/add")}
          >
            {t('add_blog_post')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
