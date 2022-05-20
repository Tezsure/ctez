import axios from "axios";
import { useQuery } from "react-query";
import { driftGraphInterface, priceSats } from "../interfaces/analytics";

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