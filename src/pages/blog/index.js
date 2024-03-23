import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { CircularProgress, Grid, Pagination, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SingleBlogItem from '@/components/public/blog-page/SingleBlogItem';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import Footer from '@/components/public/Footer';

export default function BlogIndexPage(){
  const { publicRuntimeConfig } = getConfig()
  const { t } = useTranslation('common')

  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [allResults, setAllResults] = useState(12)
  const [blogPostResults, setBlogPostResults] = useState([])

  function getAllBlogPosts(page, limit){
    const axios = require('axios');
    const blogPostURL = (publicRuntimeConfig.isDebugging) ? "/local-run/v1/blog-posts/" : '/api/blog-posts/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: blogPostURL + "?page=" + page + "&limit=" + limit,
      headers: { }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setBlogPostResults(allResponse["all_blog_posts"])
           setAllResults(allResponse["total_results"])
           setDisplayLoading(false)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  useEffect(() => {
    if (typeof window !== "undefined"){
      if (firstLoad){
        getAllBlogPosts(1, 12)
        setFirstLoad(false)
      }
    }
  }, []);

  const onPageChange = (e, newPage) => {
    const currentNewPage = newPage
    getAllBlogPosts(currentNewPage, 12)
    setCurrentPage(currentNewPage)
  }

  return (
    <>
      <Head>
        <title>Blog | NetWatch Pro</title>
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
            Blog
          </Typography>
          <Typography
            variant={'h5'}
            color={'#FFFFFF'}
            fontSize={28}
            fontWeight={'normal'}
            style={{
              position: 'absolute',
              marginTop: "2%",
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: "center"
            }}
          >
            {t('see_the_latest_updates_on_this_application')}
          </Typography>
          <br/>
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
          md={12}
          xs={12}
        >
          <br/>
          <br/>
          <br/>
        </Grid>
      </Grid>
      {displayLoading &&
        <>
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <br/>
              <br/>
              <CircularProgress/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </Grid>
          </Grid>
        </>
      }
      {!displayLoading &&
        <>
          <Grid
            container={true}
            spacing={2}
          >
            {blogPostResults.map((singlePost) => {
              return (
                <>
                  <Grid
                    key={singlePost["id"]}
                    item={true}
                    md={4}
                    xs={4}
                  >
                    <SingleBlogItem
                      postID={singlePost["id"]}
                      postName={singlePost["post_title"]}
                      postAuthor={singlePost["post_author_details"]["first_name"] + " " + singlePost["post_author_details"]["last_name"]}
                      postContent={singlePost["post_content"]}
                      publishDate={singlePost["created_at"]}
                    />
                  </Grid>
                </>
              )
            })}
          </Grid>
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              md={12}
              xs={12}
              textAlign={'center'}
            >
              <br/>
              <br/>
              <Pagination
                count={Math.ceil(allResults / 12)}
                page={currentPage}
                onChange={onPageChange}
                style={{justifyContent: "center", display: "flex"}}/>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <br/>
              <br/>
              <br/>
            </Grid>
          </Grid>
        </>
      }
      <Footer/>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
