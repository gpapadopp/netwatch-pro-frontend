import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '@/components/admin/dashboard/budget';
import { LatestOrders } from '@/components/admin/dashboard/latest-orders';
import { LatestProducts } from '@/components/admin/dashboard/latest-products';
import { Sales } from '@/components/admin/dashboard/sales';
import { TasksProgress } from '@/components/admin/dashboard/tasks-progress';
import { TotalCustomers } from '@/components/admin/dashboard/total-customers';
import { TotalProfit } from '@/components/admin/dashboard/total-profit';
import { TrafficByDevice } from '@/components/admin/dashboard/traffic-by-device';
import { DashboardLayout } from '@/components/admin/dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Page(){
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>
          {t('admin_panel')} | NetWatch Pro
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
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {/*<Budget />*/}
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              {/*<TotalCustomers />*/}
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              {/*<TasksProgress />*/}
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              {/*<TotalProfit sx={{ height: '100%' }} />*/}
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/*<Sales />*/}
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/*<TrafficByDevice sx={{ height: '100%' }} />*/}
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/*<LatestProducts sx={{ height: '100%' }} />*/}
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/*<LatestOrders />*/}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
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
