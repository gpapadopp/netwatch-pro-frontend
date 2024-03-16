import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Footer(){
  const { t } = useTranslation('common')
  const router = useRouter()

  function getCurrentYear(){
    const nowDate = new Date()
    return nowDate.getFullYear().toString()
  }

  return (
    <>
      <Grid
        container={true}
        spacing={2}
        style={{backgroundColor: "#000000"}}
      >
        <Grid
          item={true}
          md={6}
          xs={12}
        >
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
            item={true}
            md={3}
            xs={3}
            >
            </Grid>
            <Grid
              item={true}
              md={9}
              xs={9}
              textAlign={'center'}
            >
              <Typography
                variant="h6"
                color={'#FFFFFF'}
              >
                {t('the_netwatch_pro_developed_for_ihu')}
              </Typography>
              <img src={'/static/app_logo_globe_removed_bg.png'} width={'75%'}
                   style={{ textAlign: "center", marginTop: "-10%" }}/>
              <Typography
                variant="h5"
                color={'#FFFFFF'}
                style={{marginTop: "-10%"}}
              >
                NetWatch Pro
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={6}
          xs={12}
          textAlign={'center'}
        >
          <Typography
            variant={'h6'}
            color={'#FFFFFF'}
            style={{ textDecoration: "underline" }}
          >
            {t('main_links')}
          </Typography>
          <br/>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer", display: "block" }}
          >
            {t('home_page')}
          </Typography>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/blog")}
            style={{ cursor: "pointer", display: "block", marginTop: "-1.5%" }}
          >
            Blog
          </Typography>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/about")}
            style={{ cursor: "pointer", display: "block", marginTop: "-1.5%" }}
          >
            {t('about_application')}
          </Typography>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/privacy-policy")}
            style={{ cursor: "pointer", display: "block", marginTop: "-1.5%" }}
          >
            {t('privacy_policy')}
          </Typography>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/terms-of-use")}
            style={{ cursor: "pointer", display: "block", marginTop: "-1.5%" }}
          >
            {t('terms_of_use')}
          </Typography>
          <br/>
          <Typography
            variant={'a'}
            color={'#FFFFFF'}
            onClick={() => router.push("/api-docs")}
            style={{ cursor: "pointer", display: "block", marginTop: "-1.5%" }}
          >
            {t('api_documentation')}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <Typography
            variant={'span'}
            color={'#FFFFFF'}
          >
            &copy; Copyright {getCurrentYear()} <a href={'https://ihu.gr'} target={"_blank"}>International Hellenic University</a>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
