/**
 * Main routes of Application
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../Dashboard';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    marginTop: '6rem',
  }
})

function RoutesMain() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Switch>
        <Route exact path=""><Dashboard /></Route>
      </Switch>
    </Container>
  );
}

export default RoutesMain;
