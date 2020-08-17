/**
 * Bottom Footer of main application
 */
import React from 'react';
import { Typography, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    margin: '2rem'
  },
  divider: {
    margin: '1rem'
  }
})

function NavigationFooter() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Divider className={classes.divider}/>
      <Typography variant="body2">
        Structura Biotechnology Full-Stack Tech Challenge by Leigh Silverstein
      </Typography>
    </div>
  );
}

export default NavigationFooter;
