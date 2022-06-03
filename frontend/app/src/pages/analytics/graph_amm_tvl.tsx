import { Button, ButtonGroup, Flex, Skeleton, SkeletonText, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCtezGraphAMMTVL, useCtezGraphAMMTVLAll } from "../../api/analytics";
import { TextWithCircleColor } from "../../components/analytics/TTextWithColorCircle";
import TwoLineChart from "../../components/graph/two-line-chart-t";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const color = '#0F62FF';
const color2 = '#38CB89';
const GraphAMMTVL: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const { data:data1m = false } = useCtezGraphAMMTVL();
    const { data:dataAll = false } = useCtezGraphAMMTVLAll();

    const [value, setValue] = useState<number | undefined>();
    const [activeTab,setActiveTab]=useState('all');
    // graph options

    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX='35px'
        paddingY='27px'
        gridGap={4}
    >

        <Flex justifyContent='space-between'>
            <div>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '20px' : '16px'}
                lineHeight="29px"
                fontWeight={600}
            >
                TVL
            </Text>
            <Text
            color={textcolor}
            fontSize={largerScreen ? '32px' : '18px'}
            lineHeight="29px"
            fontWeight={600}
            >
            {(data1m && !value)?numberToMillionOrBillionFormate(data1m[data1m.length-1].value):value?numberToMillionOrBillionFormate(value):<SkeletonText pr={6} noOfLines={1} spacing="1" />}
            
            </Text>
            </div>
            <Flex  flexDirection='column' gridGap={2} justifyContent='space-between' fontWeight={400} fontSize='12px' >
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab==='1m'?"btnactive":''} textDecoration='underline' onClick={()=>setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab==='all'?"btnactive":''}  textDecoration='underline' onClick={()=>setActiveTab('all')}>ALL</Button>
            </ButtonGroup>
            <Flex gridGap={4}>
                <TextWithCircleColor color={color}  text="Ctez" />
                <TextWithCircleColor color={color2}  text="Tez" />

            </Flex>
            </Flex>
            

        </Flex>
        {activeTab==='1m' ? data1m?<TwoLineChart
         data={data1m}  setValue={setValue} 
        />:<Skeleton height='300px' minWidth='20px' />:
        dataAll?<TwoLineChart
         data={dataAll} isShowMonth setValue={setValue} 
        />:<Skeleton height='300px' minWidth='20px' />
        }
    </Flex>)
}
export default GraphAMMTVL;
