/**
 * The home dashboard for the main application
 */

import React from 'react';
import useSWR from 'swr';
import StatisticCard from './StatisticCard';
import { Grid, Divider } from '@material-ui/core';
import { Chart } from 'react-charts';
import moment from 'moment';

/**
 * displayAverages - series of objects used to provide the correct information to display average statistic cards
 * {
 * name: string - name of card
 * key: string - the key for the value in the averages data returned from the api
 * }[]
 */

const displayAverages = [
  {name: 'Average Motion Curvature', key: 'motion_curvature'},
  {name: 'Average CTF Fit to Å', key: 'ctf_fit_to_A'},
  {name: 'Average Pick NCC Median', key: 'pick_ncc_median'},
  {name: 'Average Pick Power Median', key: 'pick_pow_median'},
  {name: 'Average Number of Picks', key: 'num_particles'},
  {name: 'Average Astigmatism', key: 'df_ast'},
  {name: 'Average Motion', key: 'motion_total_pix'},
];

export type $streamType = { y: number, x: string }[];

/**
 * effect function - this exists outside the react component purely to assist with testing 
 */

export const effect : any = (random: number, stream: $streamType, setStream: Function)=>[()=>{
  /**
   * adds random data to stream
   */
  if(random)
    setStream(stream.concat([{
      y: random, x: moment().format("mm:ss")
    }]));
}, [random]]

function Dashboard() {
  const { data: count, error: countError } = useSWR('/api/count', { refreshInterval: 0 },)
  const { data: averages, error: averageError } = useSWR('/api/averages', { refreshInterval: 0 })
  const { data: random, error: randomError } = useSWR('/api/random', { refreshInterval: 500 })

  /**
   * stream : { y: number, x: string }[] - The datums object for the line chart
   */
  const [ stream, setStream ] = React.useState<$streamType>([]);
  
  /**
   * Configuration for react-charts:
   * Stops datapoints from being shown
   */
  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  )
  
  /**
   * Configuration for react-charts:
   * Sets the axes types and positions
   */
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  React.useEffect.apply(null, effect(random, stream, setStream))
  

  if (countError || averageError || randomError) return <div>failed to load</div>
  if (count === undefined || averages === undefined) return <div>loading...</div>
  return <div>
    <Grid direction="row" alignItems="center" justify="center" spacing={2} container>
      <Grid item>
        <StatisticCard name="Total Micrographs" value={count}/>
      </Grid>
      {
        displayAverages.map(({name, key})=><Grid key={name} item><StatisticCard  name={name} value={averages[key]}/></Grid>)
      }
    </Grid>
    <Divider style={{marginTop: '4rem'}} />
    <Grid style={{marginTop: '4rem'}} container justify="center" >
      <Grid item>
        <div style={{width: '500px', height: '300px'}}>
          {
            !stream.length ? null : <Chart data={
              [
                {
                  label: 'Random Data',
                  datums: stream
                }
              ]
            } series={series} axes={axes} tooltip /> 
          }
        </div>
      </Grid>
    </Grid>
    
  </div>

}

export default React.memo(Dashboard);
