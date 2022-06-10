import { Button, ButtonGroup, Flex, Skeleton, SkeletonText, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { format } from 'date-fns/fp';
import { useDriftGraph, useDriftGraphAll } from "../../api/analytics";
import LineChart from "../../components/graph/line-chart";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const GraphDrift: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg2',
        'imported',
        'text4',
    ]);
    const { data:data1m = false } = useDriftGraph();
    const { data:dataAll = false } = useDriftGraphAll();
    const [value, setValue] = useState<number | undefined>();
    const [time, setTime] = useState<number | undefined>();
    const [activeTab,setActiveTab]=useState('1m');
    // graph options
    const dateFormat = useMemo(() => format('MMM d, yyyy'), []);
   
    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX='35px'
        paddingY='27px'
        gridGap={1}
    >

      <Flex justifyContent='space-between'>
            <div>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '14px' : '14px'}
                lineHeight="29px"
                fontWeight={400}
            >
                Annual Drift
            </Text>
            <Flex flexDirection='column'>
            <Text
            color={textcolor}
            fontSize={largerScreen ? '32px' : '18px'}
            lineHeight="29px"
            fontWeight={600}
            >
            {(data1m && !value && data1m[data1m.length-1].value )?`${numberToMillionOrBillionFormate(data1m[data1m.length-1].value,2)} %`:value?`${numberToMillionOrBillionFormate(value,2)} %`:<SkeletonText pr={6} noOfLines={1} spacing="1" />}
            </Text>
            {time ? <Text fontSize='12px' >{dateFormat(time )}</Text>:<Text fontSize='12px'  opacity={0}>Time</Text>}
            </Flex>
            </div>
           
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab==='1m'?"btnactive":''} textDecoration='underline' onClick={()=>setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab==='all'?"btnactive":''}  textDecoration='underline' onClick={()=>setActiveTab('all')}>ALL</Button>
            </ButtonGroup>
        </Flex>
        {activeTab==='1m' ? data1m?<LineChart
        isShowSmallData
         data={data1m}  setValue={setValue} setLabel={setTime}
        />:<Skeleton height='300px' minWidth='20px' />:
        dataAll?<LineChart
        isShowSmallData
         data={dataAll} isShowMonth setValue={setValue} setLabel={setTime}
        />:<Skeleton height='300px' minWidth='20px' />
        }
    </Flex>)
}
export default GraphDrift;
