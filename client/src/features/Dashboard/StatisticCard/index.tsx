/**
 * Simple cards that display the name of a statistic and the value of that statistic
 */

import React from 'react';
import { Card, CardContent, CardHeader, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: '20rem',
    height: '10rem',
    position: 'relative'
  },
  value: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
/**
 * 
 * @param name : string - The title of the card
 * @param value : number - The value of the card  
 */

function StatisticCard({ name, value }: { name: string, value: number}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title={name}
      />
      <CardContent>
        <Typography className={classes.value} color="primary" align="center" variant="h3" component="p">
          {
            Math.floor(value*100)/100
          }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatisticCard;
