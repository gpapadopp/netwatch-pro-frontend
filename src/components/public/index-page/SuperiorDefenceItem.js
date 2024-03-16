import { Divider, Grid, Typography } from '@mui/material';

export default function SuperiorDefenceItem({topImageURL, mainTitle, secondaryTitle}){
  return (
    <>
      <Grid
        container={true}
        spacing={2}
        style={{boxShadow: "0 8px 16px rgba(29,29,27,.08)"}}
      >
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <img src={topImageURL} width={'15%'}/>
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
            {mainTitle}
          </Typography>
        </Grid>
        <Grid
          item={true}
          md={12}
          xs={12}
          textAlign={'center'}
        >
          <Divider variant={'inset'}/>
          <br/>
          <Typography
            variant={'span'}
          >
            {secondaryTitle}
          </Typography>
          <br/>
          <br/>
        </Grid>
      </Grid>
    </>
  )
}
