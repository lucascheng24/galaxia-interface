import { Grid } from '@mui/material';

const registerAccount = (props: any) => {

    const createAccount = () => {

    }


  return (
    <Grid container className='common-PlainText'>
        <Grid item xs={12} className='common-border-01'>Register Account</Grid>
        <Grid item xs={8} className='common-border-01'>
            <div>xs=8</div>
        </Grid>
        <Grid item xs={4} className='common-border-01'>
            <div>xs=4</div>
        </Grid>
        <Grid item xs={4} className='common-border-01'>
            <div>xs=4</div>
        </Grid>
        <Grid item xs={8} className='common-border-01'>
            <div>xs=8</div>
        </Grid>
        <Grid item xs={4} className='common-border-01'>
            <div>Register</div>
        </Grid>
    </Grid>
  );
}

export default registerAccount;