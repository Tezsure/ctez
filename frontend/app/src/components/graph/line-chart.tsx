import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, CartesianGrid, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns/fp';
import { Box } from '@chakra-ui/react';
import { numberToMillionOrBillionFormate } from '../../utils/numberFormate';

const DEFAULT_HEIGHT = 300;
const formatDay = format('dd');
const formatMonth = format('LLL');
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
  isShowSmallData?:boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const LineChart = ({
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
  isShowSmallData=false,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const parsedValue = value;
  const dataassending=data.sort((a,b)=>a.value-b.value);
  const top=dataassending[dataassending.length-1]
  const bottom=dataassending[0]
  return (
    <Box minHeight={minHeight}  {...rest}>
      <Box>
        {topLeft ?? null}
        {topRight ?? null}
      </Box>
      <ResponsiveContainer width="100%" height={minHeight}>
        <AreaChart
          width={500}
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
        >
          {/* <CartesianGrid  
        vertical={false}
        stroke="#aab8c2"
        /> */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor='#3260EF' stopOpacity={0.19} />
            <stop offset="100%" stopColor='#3560ED' stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis
         axisLine={false}
         tickLine={false}
         domain={[bottom, top]}
         fontSize='12px'
         display='none'
         tickFormatter={(dataYAxis)=>isShowSmallData?numberToMillionOrBillionFormate(dataYAxis,2,true):numberToMillionOrBillionFormate(dataYAxis,2)}
         />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => isShowMonth?formatMonth(parseISO(time)):formatDay(parseISO(time))}
            minTickGap={10}
            fontSize='12px'
          />
          <Tooltip
            contentStyle={{ display: 'none' }}
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
          />
          <Area
            dataKey="value"
            type="monotone"
            stroke={color}
            fill="url(#gradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      <Box>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </Box>
    </Box>
  );
};

export default LineChart;
