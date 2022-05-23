import axios from "axios";
import { useQuery } from "react-query";
import { ctezGraphctez, ctezGraphOvendata, ctezGraphTVL, ctezGraphVolumestat, ctezMainHeader, ctezOven, driftGraphInterface, priceSats } from "../interfaces/analytics";

const analyticsAPI = axios.create({
        baseURL: 'http://3.109.105.200'
});
export const usePriceStats = () => {
    return useQuery<{ctez_priceArr:number[],tez_priceArr:number[],dateArr:number[]}, Error>(
      'price_stats',
     async () => {
        const data = await analyticsAPI.get('/price_stats');
        const priceStatsArr:priceSats[]=data.data;
        const ctez_priceArr:number[]=[];
        const tez_priceArr:number[]=[];
        const dateArr:number[]=[];
        priceStatsArr.forEach((element)=>{
           ctez_priceArr.push(element.ctez_price);
           tez_priceArr.push(parseFloat(element.tez_price));
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {ctez_priceArr,tez_priceArr,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };
  export const useDriftGraph= () => {
    return useQuery<{currentAnnualDriftArr:number[],dateArr:number[]}, Error>(
      'drift_stats',
     async () => {
        const data = await analyticsAPI.get('/main_data/drift');
        const priceStatsArr:driftGraphInterface[]=data.data;
        const currentAnnualDriftArr:number[]=[];
        const dateArr:number[]=[];
        priceStatsArr.forEach((element)=>{
            currentAnnualDriftArr.push(element.currentAnnualDrift);
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {currentAnnualDriftArr,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };
  export const useMainHeader= () => {
    return useQuery<ctezMainHeader, Error>(
      'main_header',
     async () => {
        const data = await analyticsAPI.get('/summary');
        const ctezMainHeader:ctezMainHeader=data.data;
        return ctezMainHeader;
      },
      { refetchInterval: 30_000 },
    );
  };
  export const useCtezOven= () => {
    return useQuery<ctezOven, Error>(
      'main_ctezOven',
     async () => {
        const data = await analyticsAPI.get('/ovens');
        const ctezOven:ctezOven=data.data;
        return ctezOven;
      },
      { refetchInterval: 30_000 },
    );
  };
  export const useCtezGraphctez = () => {
    return useQuery<{data1:number[],data2:number[],dateArr:number[]}, Error>(
      'graph_ctez',
     async () => {
        const data = await analyticsAPI.get('/main_data/target');
        const priceStatsArr:ctezGraphctez[]=data.data;
        const data1:number[]=[];
        const data2:number[]=[];
        const dateArr:number[]=[];
        priceStatsArr.forEach((element)=>{
           data1.push(element.current_price);
           data2.push(element.current_target);
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {data1,data2,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };
  export const usectezGraphTVL= () => {
    return useQuery<{data1:number[],dateArr:number[]}, Error>(
      'ctez_graph_TVL',
     async () => {
        const data = await analyticsAPI.get('/main_data/drift');
        const ctezGraphTVL:ctezGraphTVL=data.data;
        const data1:number[]=[];
        const dateArr:number[]=[];
        ctezGraphTVL.tvlData.forEach((element)=>{
            data1.push(element.tvl);
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {data1,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };

  export const usectezGraphOvendata= () => {
    return useQuery<{data1:number[],dateArr:number[]}, Error>(
      'ctez_graph_TVL',
     async () => {
        const data = await analyticsAPI.get('/main_data/drift');
        const ctezGraphOvendata:ctezGraphOvendata=data.data;
        const data1:number[]=[];
        const dateArr:number[]=[];
        ctezGraphOvendata.ovendata.forEach((element)=>{
            data1.push(element.ctezStanding);
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {data1,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };
  export const usectezGraphVolumestat= () => {
    return useQuery<{data1:number[],dateArr:number[]}, Error>(
      'ctez_graph_TVL',
     async () => {
        const data = await analyticsAPI.get('/main_data/drift');
        const ctezGraphVolumestat:ctezGraphVolumestat=data.data;
        const data1:number[]=[];
        const dateArr:number[]=[];
        ctezGraphVolumestat.volumestats.forEach((element)=>{
            data1.push(element.volume24hours);
           dateArr.push(new Date(element.timestamp).getDate())
        })
        return {data1,dateArr};
      },
      { refetchInterval: 30_000 },
    );
  };
  