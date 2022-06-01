import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, CartesianGrid, YAxis, PieChart, Pie } from 'recharts';
import { format, parseISO } from 'date-fns/fp';
import { Box } from '@chakra-ui/react';
import { numberToMillionOrBillionFormate } from '../../utils/numberFormate';

const DEFAULT_HEIGHT = 300;
const formatDay = format('dd');
const formatMonth = format('dd LLL');
export type PiChartProps = {
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
} & React.HTMLAttributes<HTMLDivElement>;

const PiChart = ({
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
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: PiChartProps) => {
  const parsedValue = value;
  
  return (
    
        <PieChart
          width={500}
          height={300}
          data={data}
        
          onMouseLeave={() => {
            setLabel && setLabel(undefined);
            setValue && setValue(undefined);
          }}
        >
          <Pie
            dataKey="value"
            type="monotone"
            stroke={color}
            fill="url(#gradient)"
            nameKey="time" 
            cx="50%" 
            cy="50%"
            innerRadius={60} 
            outerRadius={80}
          />
        </PieChart>
  );
};

export default PiChart;
