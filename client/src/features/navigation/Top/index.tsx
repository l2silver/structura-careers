/**
 * Top navigation for main application
 */

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
})

function NavigationTop() {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title} variant="h6">        
          Structura
        </Typography>
        {
          <Link to='/'><IconButton><Home/></IconButton> </Link>
        }
      </Toolbar>
    </AppBar>
  );
}

export default NavigationTop;
