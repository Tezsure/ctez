import { Button, ButtonGroup, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import {  useCtezGraphctez1m, useCtezGraphctezall, usePriceStats } from "../../api/analytics";
import { TextWithCircleColor } from "../../components/analytics/TTextWithColorCircle";
import TwoLineChart from "../../components/graph/two-line-chart";
import GraphTwoLine from "../../components/graph/TwoLineGraph";
import { useThemeColors } from "../../hooks/utilHooks";

const color = '#0F62FF';
const color2 = '#38CB89';
const GraphCtez: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
  const { data:mainDatatarget1m=false } = useCtezGraphctez1m();
  const { data:mainDatatargetall=false } = useCtezGraphctezall();

  const [value, setValue] = useState<number | undefined>();
  const [activeTab,setActiveTab]=useState('all');
    // graph options
    
    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX='35px'
        paddingY='27px'
        gridGap={1}
    >

        <Flex justifyContent='space-between'>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '20px' : '16px'}
                lineHeight="29px"
                fontWeight={600}
            >
                Ctez
            </Text>
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab==='1m'?"btnactive":''} textDecoration='underline' onClick={()=>setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab==='all'?"btnactive":''}  textDecoration='underline' onClick={()=>setActiveTab('all')}>ALL</Button>
            </ButtonGroup>

        </Flex>
        <Flex justifyContent='space-between' fontWeight={400} fontSize='12px' >
            <Flex gridGap={4}>
                <TextWithCircleColor color={color}  text="Price" />
                <TextWithCircleColor color={color2}  text="Target" />

            </Flex>
            {value && <Text>Premium  <b>{value}%</b></Text>}
        </Flex>
        
        {/* <GraphTwoLine labelArr={priceData.dateArr} data1={priceData.ctez_priceArr} data2={priceData.tez_priceArr}/>
        graph goes here */}
        {activeTab==='1m' ? mainDatatarget1m?<TwoLineChart
         data={mainDatatarget1m}  setValue={setValue} 
        />:null:
        mainDatatargetall?<TwoLineChart
         data={mainDatatargetall}  setValue={setValue} 
        />:null
        }
    </Flex>)
}
export default GraphCtez;
