import Head from 'next/head';
import HeaderMenu from '@/components/public/HeaderMenu';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Tooltip,
  Typography
} from '@mui/material';
import Footer from '@/components/public/Footer';
import { useTranslation } from 'next-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import SuperiorDefenceItem from '@/components/public/index-page/SuperiorDefenceItem';

export default function IndexPage(){
  const { t } = useTranslation('common')
  const router = useRouter()
  const lang = router.locale

  return (
    <>
      <Head>
        <title>NetWatch Pro</title>
      </Head>
      <HeaderMenu/>
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
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <Typography
            variant={'h4'}
          >
            {t('antivirus_antimalware_for_android_devices')}
          </Typography>
          <Typography
            variant={'h6'}
          >
            {t('keep_your_phone_or_tablet_protected')}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
        >
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
          textAlign={'center'}
          style={{backgroundImage: 'url(/static/app_logo_globe_removed_bg_40_opacity.png)', backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: "cover" }}
        >
          <Divider
            variant={'inset'}
            sx={{ color: '#000000' }}/>
          <Typography
            variant={'span'}
            style={{marginTop: "2%", display: "block"}}
          >
            {t('your_device_contains_vulnerabilities')}
          </Typography>
          <br/>
          <List dense={false}>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color: "#3B8132"}} />
              </ListItemIcon>
              <ListItemText
                primary={t('antivirus_keeps_your_app_safe')}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color: "#3B8132"}} />
              </ListItemIcon>
              <ListItemText
                primary={t('lightweight_installation')}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color: "#3B8132"}} />
              </ListItemIcon>
              <ListItemText
                primary={t('include_optimization_tools')}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
        >
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
        >
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
          textAlign={'center'}
        >
          <Grid
            container={true}
            spacing={0}
          >
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'right'}
            >
              {(lang === "en") &&
                <>
                  <Tooltip title={t('download_the_application')} placement={"top"}>
                    <div>
                      <a href={"https://play.google.com"} target={"_blank"}>
                        <img src={'/static/en-google-play-badge.png'} width={'65%'}/>
                      </a>
                    </div>
                  </Tooltip>
                </>
              }
              {(lang === "el") &&
                <>
                  <Tooltip title={t('download_the_application')} placement={"top"}>
                    <div>
                      <a href={"https://play.google.com"} target={"_blank"}>
                        <img src={'/static/el-google-play-badge.png'} width={'65%'}/>
                      </a>
                    </div>
                  </Tooltip>
                </>
              }
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'left'}
            >
              {(lang === "en") &&
                <>
                  <Tooltip title={t('download_the_application')} placement={"top"}>
                    <div>
                      <a href={"https://play.google.com"} target={"_blank"}>
                        <img src={'/static/en-download-it-now.png'} width={'73%'}
                             style={{ marginTop: '-2%' }}/>
                      </a>
                    </div>
                  </Tooltip>
                </>
              }
              {(lang === "el") &&
                <>
                  <Tooltip title={t('download_the_application')} placement={"top"}>
                    <div>
                      <a href={"https://play.google.com"} target={"_blank"}>
                        <img src={'/static/el-download-it-now.png'} width={'73%'} style={{marginTop: "-2%"}}/>
                      </a>
                    </div>
                  </Tooltip>
                </>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={4}
        >
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
        <Grid
          item={true}
          md={2}
          xs={2}
        >
        </Grid>
        <Grid
          item={true}
          md={10}
          xs={10}
        >
          <Grid
            container={true}
            spacing={0}
          >
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'right'}
            >
              <img src={'/static/security-shield-banner.png'} style={{marginRight: "10%"}} />
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'left'}
            >
              <br/>
              <br/>
              <br/>
              <br/>
              <Typography
                variant={'h6'}
                textAlign={'left'}
                style={{marginRight: "45%", display: "block", marginLeft: "-15%"}}
              >
                {t('security_shield_description')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={2}
          xs={2}
        >
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
        >
        </Grid>
        <Grid
          item={true}
          md={2}
          xs={2}
        >
        </Grid>
        <Grid
          item={true}
          md={10}
          xs={10}
        >
          <Grid
            container={true}
            spacing={0}
          >
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'right'}
            >
              <br/>
              <br/>
              <br/>
              <br/>
              <Typography
                variant={'h6'}
                textAlign={'right'}
                style={{marginRight: "20%", marginLeft: "15%"}}
              >
                {t('financial_security_description')}
              </Typography>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={6}
              textAlign={'left'}
            >
              <img src={'/static/financial_security.png'} style={{display: "block", marginLeft: "-7%"}} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={2}
          xs={2}
        >
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
        >
          <br/>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <Typography
            variant={'h6'}
          >
            {t('superior_defense_for_android_devices')}
          </Typography>
          <Typography
            variant={'span'}
            style={{marginTop: "1%", display: "block"}}
          >
            {t('netwatch_provides_cybersecurity_for_all_users')}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={2}
          xs={2}
        >
        </Grid>
        <Grid
          item={true}
          md={8}
          xs={8}
        >
          <br/>
          <Grid
            container={true}
            spacing={4}
          >
            <Grid
              item={true}
              md={4}
              xs={4}
            >
              <SuperiorDefenceItem
                topImageURL={'/static/security_shield_banner_remove_bg.png'}
                mainTitle={t('security')}
                secondaryTitle={t('complete_digital_security')}
              />
            </Grid>
            <Grid
              item={true}
              md={4}
              xs={4}
            >
              <SuperiorDefenceItem
                topImageURL={'/static/performace_remove_bg.png'}
                mainTitle={t('performance')}
                secondaryTitle={t('optimization_tool_description')}
              />
            </Grid>
            <Grid
              item={true}
              md={4}
              xs={4}
            >
              <SuperiorDefenceItem
                topImageURL={'/static/privacy_banner_remove_bg.png'}
                mainTitle={t('privacy')}
                secondaryTitle={t('locks_down_identity')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={2}
          xs={2}
        >
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
