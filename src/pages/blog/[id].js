import getConfig from 'next/config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { Grid, Typography } from '@mui/material';
import moment from 'moment/moment';
import Footer from '@/components/public/Footer';
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  GabShareButton, GabIcon,
  HatenaShareButton, HatenaIcon,
  InstapaperShareButton, InstapaperIcon,
  LineShareButton, LineIcon,
  LinkedinShareButton, LinkedinIcon,
  LivejournalShareButton, LivejournalIcon,
  MailruShareButton, MailruIcon,
  OKShareButton, OKIcon,
  PinterestShareButton, PinterestIcon,
  PocketShareButton, PocketIcon,
  RedditShareButton, RedditIcon,
  TelegramShareButton, TelegramIcon,
  TumblrShareButton, TumblrIcon,
  TwitterShareButton, TwitterIcon,
  ViberShareButton, ViberIcon,
  VKShareButton, VKIcon,
  WhatsappShareButton, WhatsappIcon,
  WorkplaceShareButton, WorkplaceIcon
} from 'react-share';
import { useRouter } from 'next/router';

export default function SingleBlogPostPage({singlePost, locale}){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const lang = router.locale

  const parsedDate = new moment.utc(singlePost['blog_post']['created_at']).local()

  const shareURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:3000/" + lang + "/blog/" + singlePost['blog_post']['id'] : "https://arctouros.ict.ihu.gr/" + lang + "/blog/" + singlePost['blog_post']['id']

  return (
    <>
      <Head>
        <title>{singlePost["blog_post"]["post_title"]} | NetWatch Pro</title>
      </Head>
      <HeaderMenu/>
      <Grid
        container={true}
        spacing={0}
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000000"
        }}
      >
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Typography
            variant={'h5'}
            color={'#FFFFFF'}
            fontSize={80}
            fontWeight={'bold'}
            style={{
              position: 'absolute',
              marginTop: "-2%",
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: "center"
            }}
          >
            {singlePost["blog_post"]["post_title"]}
          </Typography>
          <Typography
            variant={'h5'}
            color={'#FFFFFF'}
            fontSize={16}
            fontWeight={'normal'}
            style={{
              position: 'absolute',
              marginTop: "2%",
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: "center"
            }}
          >
            {t('by')} {singlePost["blog_post"]["post_author_details"]['first_name']} {singlePost["blog_post"]["post_author_details"]['last_name']}
          </Typography>
          <br/>
          <br/>
          <br/>
          <br/>
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={2}
      >
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
        <Grid
          item={true}
          md={10}
          xs={10}
        >
          <br/>
          <br/>
          <Typography
            variant={'p'}
          >
            {singlePost["blog_post"]["post_content"]}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={2}
      >
        <Grid
          item={true}
          md={11}
          xs={11}
          textAlign={'right'}
        >
          <Typography
            variant={'p'}
            fontWeight={'normal'}
            fontSize={14}
          >
            {parsedDate.format('DD/MM/YYYY HH:mm')}
          </Typography>
          <br/>
          <br/>
          <br/>
          <br/>
        </Grid>
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={2}
      >
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
        <Grid
          item={true}
          md={10}
          xs={10}
          textAlign={'center'}
        >
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
            style={{textDecoration: "underline"}}
          >
            {t('share_this_blog_post')}
          </Typography>
          <br/>
          <FacebookShareButton url={shareURL}>
            <FacebookIcon size={32} round={true}/>
          </FacebookShareButton>
          &nbsp;
          <EmailShareButton url={shareURL}>
            <EmailIcon size={32} round={true}/>
          </EmailShareButton>
          &nbsp;
          <GabShareButton url={shareURL}>
            <GabIcon size={32} round={true}/>
          </GabShareButton>
          &nbsp;
          <HatenaShareButton url={shareURL}>
            <HatenaIcon size={32} round={true}/>
          </HatenaShareButton>
          &nbsp;
          <InstapaperShareButton url={shareURL}>
            <InstapaperIcon size={32} round={true}/>
          </InstapaperShareButton>
          &nbsp;
          <LineShareButton url={shareURL}>
            <LineIcon size={32} round={true}/>
          </LineShareButton>
          &nbsp;
          <LinkedinShareButton url={shareURL}>
            <LinkedinIcon size={32} round={true}/>
          </LinkedinShareButton>
          &nbsp;
          <LivejournalShareButton url={shareURL}>
            <LivejournalIcon size={32} round={true}/>
          </LivejournalShareButton>
          &nbsp;
          <MailruShareButton url={shareURL}>
            <MailruIcon size={32} round={true}/>
          </MailruShareButton>
          &nbsp;
          <OKShareButton url={shareURL}>
            <OKIcon size={32} round={true}/>
          </OKShareButton>
          &nbsp;
          <PinterestShareButton url={shareURL} media={null}>
            <PinterestIcon size={32} round={true}/>
          </PinterestShareButton>
          &nbsp;
          <PocketShareButton url={shareURL}>
            <PocketIcon size={32} round={true}/>
          </PocketShareButton>
          &nbsp;
          <RedditShareButton url={shareURL}>
            <RedditIcon size={32} round={true}/>
          </RedditShareButton>
          &nbsp;
          <TelegramShareButton url={shareURL}>
            <TelegramIcon size={32} round={true}/>
          </TelegramShareButton>
          &nbsp;
          <TumblrShareButton url={shareURL}>
            <TumblrIcon size={32} round={true}/>
          </TumblrShareButton>
          &nbsp;
          <TwitterShareButton url={shareURL}>
            <TwitterIcon size={32} round={true}/>
          </TwitterShareButton>
          &nbsp;
          <ViberShareButton url={shareURL}>
            <ViberIcon size={32} round={true}/>
          </ViberShareButton>
          &nbsp;
          <VKShareButton url={shareURL}>
            <VKIcon size={32} round={true}/>
          </VKShareButton>
          &nbsp;
          <WhatsappShareButton url={shareURL}>
            <WhatsappIcon size={32} round={true}/>
          </WhatsappShareButton>
          &nbsp;
          <WorkplaceShareButton url={shareURL}>
            <WorkplaceIcon size={32} round={true}/>
          </WorkplaceShareButton>
          <br/>
          <br/>
          <br/>
          <br/>
        </Grid>
        <Grid
          item={true}
          md={1}
          xs={1}
        >
        </Grid>
      </Grid>
      <Footer/>
    </>
  )
}

export async function getServerSideProps({query, locale}) {
  const blogPostID = query.id
  const { publicRuntimeConfig } = getConfig()

  const blogPostURL = (publicRuntimeConfig.isDebugging) ? "v1/blog-posts/" : '/api/v1/blog-posts/'
  const baseURL = (publicRuntimeConfig.isDebugging) ? publicRuntimeConfig.localURLPath : publicRuntimeConfig.basicURLPath

  const data = await fetch(baseURL + blogPostURL + blogPostID);
  let singlePost = await data.json();

  return {
    props: {
      singlePost, locale ,
      ...await serverSideTranslations(locale, ['common']),
      paths: [
        { params: { id: '1' } }
      ],
      fallback: true
    }
  }
}
