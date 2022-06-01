import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area } from 'recharts';
import { format, parseISO } from 'date-fns/fp';
import { Box } from '@chakra-ui/react';

const DEFAULT_HEIGHT = 300;
const formatDay = format('dd');

export type LineChartProps = {
  data: any[];
  color?: string | undefined;
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

const LineChart = ({
  data,
  color = '#7028e4',
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
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onMouseLeave={() => {
            setLabel && setLabel(undefined);
            setValue && setValue(undefined);
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => formatDay(parseISO(time))}
            minTickGap={10}
          />
          <Tooltip
            contentStyle={{ display: 'none' }}
            formatter={(
              value: number,
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
