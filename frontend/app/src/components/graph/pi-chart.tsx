import { useColorMode } from '@chakra-ui/react';
import { format } from 'date-fns/fp';
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { useThemeColors } from '../../hooks/utilHooks';
import { trimAddress, trimSizeMap } from '../../utils/addressUtils';

const RenderActiveShape = (props: any) => {

  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    textColor,
    address
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.address==="Others"?'Others':trimAddress(payload.address)}
        
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={textColor}
        className='alingright'
      >Minted</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={textColor}
        fontWeight={600}
        fontSize='16px'
        className='alingright'
      >
        {`${value} CTEZ`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={29}
        fontSize='12px'
        className='alingright'
        textAnchor={textAnchor}
        fill='#B0B7C3'
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
const ColorPalet=['#463ABF','#7B70FF','#A586E3','#675CD5','#2161F7','#8FA9FA']
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
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const [textColor,text4] = useThemeColors([
    'textColor',
    'text4',
]);
  const theme = useColorMode();
  return (
    <ResponsiveContainer width="100%" height={minHeight}>

    <PieChart  height={300}>
    <Pie 
    data={data} 
    dataKey="value" 
    nameKey="time" 
    cx='207px'
    cy='207px'
    innerRadius={60} 
    outerRadius={80} 
    fill="#82ca9d"  
    activeIndex={activeIndex}
    activeShape={<RenderActiveShape  textColor={theme.colorMode==='dark'?'#FFFFFF':'#4E5D78'} />}
    onMouseEnter={onPieEnter}
    >
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={ColorPalet[index % ColorPalet.length]} />
      ))}
      </Pie>
  </PieChart>
  </ResponsiveContainer>
  );
};

export default PiChart;
