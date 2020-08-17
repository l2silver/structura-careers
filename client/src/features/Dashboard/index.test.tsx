import React from 'react';
import Dashboard, { effect } from '.';
import type {$streamType} from '.';
import { render, wait } from '@testing-library/react';
import { SWRConfig } from 'swr';

describe('Dashboard', ()=>{
  describe('effects', ()=>{
    it('should update the steam correctly', ()=>{
      let nextValue: $streamType = [];
      const random = Math.random();
      const stream : $streamType = [];
      const setStream : Function = (nextStream: $streamType)=>{
        nextValue = nextStream;
      };
      const [effectFunc, deps] = effect(random, stream, setStream);
      expect(deps).toEqual([random]);
      effectFunc();
      expect(nextValue[0].y).toEqual(random);
      expect(nextValue[0].x.indexOf(':')).toBe(2);
    })
  });
  describe('renders', ()=>{
    it('should load the correct cards', async ()=>{
      const count = Math.random();
      const averages = {"motion_curvature":3.4195235461552835,"ctf_fit_to_A":3.6262691689997304,"pick_ncc_median":0.38783980465056944,"num_particles":1021.454081632653,"pick_pow_median":1341.51593328982,"df_ast":197.2695910395408,"motion_total_pix":14.532792706880732}
      const apiValues = {
        '/api/count': Promise.resolve(count),
        '/api/averages': Promise.resolve(averages),
        '/api/random': Promise.resolve(Math.random())

      };
      const { getByText } = render(
        <SWRConfig value={{
          fetcher: (key)=>{
            return apiValues[key]
          }
        }}>
          <Dashboard />
        </SWRConfig>);
      expect(getByText('loading...')).toBeInTheDocument();
      await wait(()=>{
        expect(getByText('Total Micrographs')).toBeInTheDocument();
      })
    })
  })
})