import { Button, Divider, Grid, Typography } from '@mui/material';
import getConfig from "next/config";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function SingleBlogItem({postID, postName, postAuthor, postContent, publishDate}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()

  const imageURL = (publicRuntimeConfig.isDebugging) ? '/local-run/v1/blog-posts/get-banner/' + postID : '/api/blog-posts/get-banner/' + postID
  const blogPageURL = "/blog/" + postID

  const parsedDate = new moment.utc(publishDate).local()

  return (
    <>
      <Grid
        container={true}
        spacing={0}
        style={{
          boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
        }}
      >
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <div
            style={{marginLeft: "2%", marginRight: "2%"}}
          >
            <br/>
            <Typography
              variant={'h6'}
              fontWeight={'bold'}
              style={{cursor: "pointer"}}
              onClick={() => router.push(blogPageURL).then()}
            >
              {postName},
            </Typography>
            <Typography
              variant={'p'}
              fontWeight={'normal'}
              fontSize={14}
            >
              {t('by')} {postAuthor}
            </Typography>
            <br/>
            <Typography
              variant={'p'}
              fontWeight={'normal'}
              fontSize={14}
            >
              {parsedDate.format('DD/MM/YYYY HH:mm')}
            </Typography>
          </div>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <Divider/>
          <br/>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <div
            style={{marginLeft: "2%", marginRight: "2%"}}
          >
            <Typography
              variant={'p'}
              fontWeight={'normal'}
            >
              {postContent.toString().substring(0, 150)}[...]
            </Typography>
          </div>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <br/>
          <Button
            variant={'outlined'}
            style={{ backgroundColor: 'transparent', color: '#000000', borderColor: "#000000" }}
            onClick={() => router.push(blogPageURL).then()}
          >
            {t('read_more')}
          </Button>
          <br/>
          <br/>
        </Grid>
      </Grid>
    </>
  )
}
