import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Grid, LinearProgress } from '@mui/material';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import BlogPostsListToolbar from '@/components/admin/blog-posts/blog-posts-list-toolbar';
import BlogPostsListResults from '@/components/admin/blog-posts/blog-posts-list-results';

export default function BlogPostsIndexPage(){
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [firstLoad, setFirstLoad] = useState(true)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_jwt']);

  const [allBlogPosts, setAllBlogPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [allResults, setAllResults] = useState(0)

  function getBlogPosts(page, limit){
    const axios = require('axios');
    const baseURL = (publicRuntimeConfig.isDebugging) ? "http://127.0.0.1:8000/v1/" : 'https://arctouros.ict.ihu.gr/api/v1/api/'

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'blog-posts/?page=' + page + '&limit=' + limit,
      headers: {
        "Authorization": 'Bearer ' + cookies.user_jwt
      }
    };

    axios.request(config)
         .then((response) => {
           const allResponse = response.data
           setAllBlogPosts(allResponse['all_blog_posts'])
           setAllResults(allResponse['total_results'])
           setDisplayLoading(false)
         })
         .catch((error) => {
           console.log(error);
         });
  }

  useEffect(() => {
    if (typeof window != "undefined"){
      if (firstLoad){
        getBlogPosts(1, 10)
        setFirstLoad(false)
      }
    }
  }, []);

  function onPageChange(newPage){
    setCurrentPage(newPage)
    setDisplayLoading(true)
    getBlogPosts(newPage, currentLimit)
  }

  function onLimitChange(newLimit){
    setCurrentLimit(newLimit)
    setDisplayLoading(true)
    getBlogPosts(currentPage, newLimit)
  }

  function onRefreshData(){
    location.reload()
  }

  return (
    <>
      <Head>
        <title>
          {t('blog_posts')} | NetWatch Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <BlogPostsListToolbar />
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              <Divider/>
            </Grid>
            <Grid
              item={true}
              md={12}
              xs={12}
            >
              {(displayLoading) &&
                <>
                  <LinearProgress/>
                </>
              }
              {(!displayLoading) &&
                <>
                  <BlogPostsListResults
                    key={1}
                    allBlogPosts={allBlogPosts}
                    totalResults={allResults}
                    page={currentPage}
                    onPageChange={onPageChange}
                    limit={currentLimit}
                    onLimitChange={onLimitChange}
                    refreshData={onRefreshData}
                  />
                </>
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

BlogPostsIndexPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
