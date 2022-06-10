import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { format } from 'date-fns/fp';
import { Box } from '@chakra-ui/react';
import { numberToMillionOrBillionFormate, parseISO } from '../../utils/numberFormate';

const DEFAULT_HEIGHT = 300;
const formatDay = format('dd');
const formatMonth = format('LLL');
const CustomTooltip = (props:any) => {
  const { active, payload, label,setValue,parsedValue,setLabel,isShowCursor}=props;
  console.log("propsprops",props)
  // if(payload && payload.length) {
  // // if (setValue && parsedValue!== ) {
  // //   setValue(Math.random());
  // // }
  if (active && payload && payload.length){
  if (setLabel && label) {
    setLabel(label);
  }
  if (setValue && payload && payload.length && payload[0].payload ) {
    setValue(payload[0].payload.value);
  }
}
  // }

  if (active && !isShowCursor && payload && payload.length) {
    console.log("payload-payload",payload)
    return (
      <div className="custom-tooltip">
        <p>Target: <b>{payload[0].value} tez</b></p>
        <p>Premium : <b>{payload[0].payload.premium}%</b></p>
      </div>
    );
  }

  return null;
};

export type LineChartProps = {
  data: any[];
  color?: string | undefined;
  color2?: string | undefined;
  strokeColor?: string | undefined;
  height?: number | undefined;
  minHeight?: number;
  setValue?: Dispatch<SetStateAction<number | undefined>>; // used for value on hover
  setLabel?: Dispatch<SetStateAction<number | undefined>>; // used for label of valye
  value?: number;
  label?: number;
  topLeft?: ReactNode | undefined;
  topRight?: ReactNode | undefined;
  bottomLeft?: ReactNode | undefined;
  bottomRight?: ReactNode | undefined;
  isShowMonth?:boolean;
  isShowCursor?:boolean
} & React.HTMLAttributes<HTMLDivElement>;

const TwoLineChart = ({
  data,
  color = '#0F62FF',
  color2 = '#38CB89',
  strokeColor='#CCD2E3',
  value,
  label,
  setValue,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  isShowMonth=false,
  isShowCursor=false,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const parsedValue = value;
  const dataassending=data;
  const top=dataassending[dataassending.length-2]
  const bottom=dataassending[0]
  return (
    <Box minHeight={minHeight}>
      
      <ResponsiveContainer width="100%"  height={minHeight}>
        <AreaChart
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -50,
            bottom: 5,
          }}
          onMouseLeave={() => {
            setLabel && setLabel(undefined);
            setValue && setValue(undefined);
          }}
          onMouseEnter={(e)=>{
            console.log('ieee',e)
          }}
        >
          {/* <CartesianGrid  
        vertical={false}
        stroke="#aab8c2"
        /> */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor='#3260EF' stopOpacity={0.30} />
              <stop offset="100%" stopColor='#3560ED' stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => isShowMonth?formatMonth(parseISO(time)):formatDay(parseISO(time))}
            minTickGap={10}
            fontSize='12px'
          />
         
         <YAxis
          domain={[bottom, top]}
          axisLine={false}
          tickLine={false}
          display='none'
          tickFormatter={(value1)=>numberToMillionOrBillionFormate(value1,2)}
          fontSize='12px'
         />
          {/* <Tooltip
            contentStyle={{ display: isShowCursor?'':'none' }}
            formatter={(
              value1: number,
              name: string,
              props: { payload: { time: string; value: number } },
            ) => {
              if (setValue && parsedValue !== props.payload.value) {
                setValue(props.payload.value);
              }
              if (setLabel && label !== parseISO(props.payload.time).getTime()) {
                setLabel(parseISO(props.payload.time).getTime());
              }
            }}
          /> */}
          <Tooltip
          formatter={(
            value1: number,
            name: string,
            props: { payload: { time: string; value: number } },
          ) => {
            if (setValue && parsedValue !== props.payload.value) {
              setValue(props.payload.value);
            }
            if (setLabel && label !== parseISO(props.payload.time).getTime()) {
              setLabel(parseISO(props.payload.time).getTime());
            }
          }}
          content={<CustomTooltip setLabel={setLabel} setValue={setValue}/>} />
    
          <Area 
          type="monotone" 
          dataKey="data1"
          stroke={color}
          strokeWidth={2}
          fill="url(#gradient)" />
          <Area 
          type="monotone" 
          dataKey="data2" 
          stroke={color2} 
          strokeWidth={2}
          fill="url(#gradient)" />
        </AreaChart>
      </ResponsiveContainer>
      <Box>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </Box>
    </Box>
  );
};

export default TwoLineChart;
