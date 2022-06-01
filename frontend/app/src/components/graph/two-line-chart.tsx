import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns/fp';
import { Box } from '@chakra-ui/react';

const DEFAULT_HEIGHT = 250;
const formatDay = format('dd');

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
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const parsedValue = value;

  return (
    <Box minHeight={minHeight}>
      
      <ResponsiveContainer width="100%"  height={minHeight}>
        <AreaChart
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
          onMouseLeave={() => {
            setLabel && setLabel(undefined);
            setValue && setValue(undefined);
          }}
        >
          <CartesianGrid  
        vertical={false}
        stroke="#aab8c2"
        />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor='#3260EF' stopOpacity={0.19} />
              <stop offset="100%" stopColor='#3560ED' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => formatDay(parseISO(time))}
            minTickGap={10}
          />
         
         <YAxis
         axisLine={false}
         tickLine={false}
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
          type="monotone" 
          dataKey="data1"
          stroke={color}
          fill="url(#gradient)" />
          <Area 
          type="monotone" 
          dataKey="data2" 
          stroke={color2} 
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
