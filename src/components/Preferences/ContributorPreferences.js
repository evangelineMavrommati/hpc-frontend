import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ResetPassword from './ResetPassword';
import BlockUsers from './BlockUsers';
import Blacklist from './Blacklist';

export default function ContributorPreferences(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <h1 style={{ fontFamily: 'arial, sans-serif' }}>Welcome back to HPC!</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h4>Reset Password</h4>
              <ResetPassword props={props} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Block a User</h4>
              <BlockUsers props={props} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Blacklist</h4>
              <Blacklist props={props} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(style => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: style.spacing(2),
    textAlign: 'center'
  },
}));